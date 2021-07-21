import { AUTH_URL, API_URL } from '@env'
import { Platform } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {LOGIN_SUCCESS, LOGIN_FAILURE} from './Type'
import {REGISTER_SUCCESS, REGISTER_FAILURE} from './Type'
import {USER_INFO_LOADED, USER_INFO_FAIL} from './Type'
import {LOGGED_OUT} from './Type'
import {QUICKPLAY_SUCCESS, QUICKPLAY_FAIL} from './Type'
import { startLoading, endLoading } from './UiApi'
import { getDeviceId, getDeviceInfo } from './DeviceApi'

export const COOKIE_AUTH_KEY = 'uss_auth'
export const COOKIE_AUTH_KEY2 = 'uss_auth2'
export const COOKIE_GUEST_KEY = 'uss_guest'

export function cookieLoad(key)
{
  return (dispatch) => {
    dispatch(startLoading())
    return AsyncStorage.getItem(key)
    .then((data) => {
      dispatch(endLoading())
      //console.log('data loaded:' + data)
      let authObj = JSON.parse(data)
      dispatch(authGetInfo(authObj.token))
      .then(info => {
        if (info) {
          dispatch(authLoginSuccess(authObj))
        }
        else {
          // expired, invalidated, corrupted..
        }
      })
    })
    .catch((err) => {
      dispatch(endLoading())
      console.log('cookie load error' + err)
    })
  }
}

export function cookieLoadPw()
{
  return (dispatch) => {
    dispatch(startLoading())
    return AsyncStorage.getItem(COOKIE_AUTH_KEY2)
    .then((data) => {
      dispatch(endLoading())
      console.log('data loaded:' + data)
      if (data != null)
        return JSON.parse(data)
      return null
    })
    .catch((err) => {
      dispatch(endLoading())
      console.log('cookie load error' + err)
      return null
    })
  }
}

function _cookieSave(key, value)
{
  return AsyncStorage.setItem(key, JSON.stringify(value))
  .then((data) => {
    console.log('cookie saved')
  })
  .catch((err) => {
    console.log('cookie save error')
  })
}

function _cookieDelete(key)
{
  //return (dispatch) => {
    return AsyncStorage.removeItem(key)
    .then((data) => {
      console.log('cookie removed')
    })
    .catch((err) => {
      console.log('cookie removed error')
    })
  //}
}

export function authLogin(username, password, remember)
{
  return (dispatch) => {
    let formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)
    formData.append('remember', remember)
    dispatch(startLoading())
    return fetch(AUTH_URL + '/api/login', {
      method: 'post',
      headers: {
    		'X-Requested-With': 'XMLHttpRequest'
    	},
      body: formData
    })
    .then(res => res.json())
    .then(json => {
      //console.log(json);
      dispatch(endLoading())
      if (json.error == 0) {
        dispatch(authLoginSuccess(json.data))
        _cookieSave(COOKIE_AUTH_KEY, json.data)
        _cookieSave(COOKIE_AUTH_KEY2, {username: username, password: password, remember: remember})
        return true
      }
      else {
        dispatch(authLoginFailure(json.error, json.message, json.data))
        return false
      }
    })
    .catch(error => {
      dispatch(endLoading())
      dispatch(authLoginFailure(error, "Request login exception!"))
      return false
    })
  }
}
export const authLoginSuccess = (data) => ({ type: LOGIN_SUCCESS, data })
export const authLoginFailure = (error, message, validators) => ({ type: LOGIN_FAILURE, error, message, validators })

export function authRegister(username, password)
{
  return (dispatch) => {
    let formData = new FormData()
    formData.append('name', username)
    formData.append('username', username)
    formData.append('password', password)
    formData.append('password_confirmation', password)
    dispatch(startLoading())
    return fetch(AUTH_URL + '/api/register', {
      method: 'post',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: formData
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      dispatch(endLoading())
      if (json.error == 0) {
        dispatch(authRegisterSuccess(json.data))
        _cookieSave(COOKIE_AUTH_KEY, json.data)
        _cookieSave(COOKIE_AUTH_KEY2, {username: username, password: password})
        return true
      }
      else {
        dispatch(authRegisterFailure(json.error, json.message, json.data))
        return false
      }
    })
    .catch(error => {
      dispatch(endLoading())
      dispatch(authRegisterFailure(error, "Request login exception!"))
      return false
    })
  }
}
export const authRegisterSuccess = (data) => ({ type: REGISTER_SUCCESS, data })
export const authRegisterFailure = (error, message, validators) => ({ type: REGISTER_FAILURE, error, message, validators })

// balance info: http://bombheroes.us/api/info
export function authGetInfo(token)
{
  return (dispatch) => {
    dispatch(startLoading())
    return fetch(API_URL + '/api/userinfo?access_token=' + token, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      }
    })
    .then(res => {
      console.log(res)
      return res.json()
    })
    .then(json => {
      dispatch(endLoading())
      if (json.error == 0) {
        dispatch(authGetInfoSuccess(json.data))
        return true
      }
      else {
        dispatch(authGetInfoFailure(json.error, json.message))
        return false
      }
    })
    .catch(error => {
      dispatch(endLoading())
      dispatch(authGetInfoFailure(error, "Request user info exception!"))
      return false
    })
  }
}
export const authGetInfoSuccess = (data) => ({ type: USER_INFO_LOADED, data})
export const authGetInfoFailure = (error, message) => ({ type: USER_INFO_FAIL, error, message})

export function authLogout(token)
{
  return (dispatch) => {
    dispatch(startLoading())
    return fetch(AUTH_URL + '/api/logout?access_token=' + token, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
    .then(res => res.json())
    .then(json => {
      dispatch(endLoading())
      dispatch(authLoggedOut())
      _cookieDelete(COOKIE_AUTH_KEY)
      _cookieDelete(COOKIE_AUTH_KEY2)
      return true
    })
    .catch(error => {
      dispatch(endLoading())
      dispatch(authLoggedOut())
      _cookieDelete(COOKIE_AUTH_KEY)
      _cookieDelete(COOKIE_AUTH_KEY2)
      return false
    })
  }
}
export const authLoggedOut = () => ({ type: LOGGED_OUT })

export function checkAuthCookies()
{
  return cookieLoad(COOKIE_AUTH_KEY)
}

export function authGuest()
{
  return (dispatch) => {
    dispatch(startLoading())
    return getDeviceId().then(deviceId => {
      console.log(deviceId)
      if (deviceId.length > 0)
      {
        let formData = new FormData()
        formData.append('device', deviceId)
        return fetch(AUTH_URL + '/api/guest', {
          method: 'post',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: formData
        })
        .then(res => res.json())
        .then(json => {
          dispatch(endLoading())
          if (json.error == 0) {
            dispatch(guestWelcome(json.data))
            _cookieSave(COOKIE_AUTH_KEY, json.data)
            _cookieSave(COOKIE_GUEST_KEY, true)
            return true
          }
          else {
            return false
          }
        })
        .catch(error => {
          dispatch(endLoading())
          console.log("Guest auth error:" + error)
          return false
        })
      }
      else {
        dispatch(endLoading())
        console.log("Guest get device id error")
        return false
      }
    })
  }
}
export const guestWelcome = (data) => ({ type: QUICKPLAY_SUCCESS, data })

export function bindGuest(token, username, password)
{
  return (dispatch) => {
    dispatch(startLoading())
    return getDeviceId().then(deviceId => {
      if (deviceId)
      {
        let formData = new FormData()
        formData.append('access_token', token)
        formData.append('device', deviceId)
        formData.append('name', username)
        formData.append('username', username)
        formData.append('password', password)
        formData.append('password_confirmation', password)
        return fetch(SITE_URL + '/api/guest/bind', {
          method: 'post',
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: formData
        })
        .then(res => res.json())
        .then(json => {
          dispatch(endLoading())
          if (json.error == 0) {
            dispatch(authRegisterSuccess(json.data))
            _cookieSave(COOKIE_AUTH_KEY, json.data)
            _cookieSave(COOKIE_AUTH_KEY2, {username: username, password: password, remember: true})
            _cookieDelete(COOKIE_GUEST_KEY)
            return true
          }
          return {...json.data, 'error':json.message}
        })
        .catch(error => {
          dispatch(endLoading())
          return {'error': error.message}
        })
      }
      else {
        dispatch(endLoading())
        return {'error': 'Device info error. Plz contact our admin.'}
      }
    })
  }
}
