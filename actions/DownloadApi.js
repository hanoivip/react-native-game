import { AppName, API_URL } from "@env"
import { Platform } from 'react-native'
import { startLoading, endLoading } from './UiApi'
import DeviceInfo from 'react-native-device-info'

export function loadDownloadConfig(token)
{
  return (dispatch) => {
    let formData = new FormData()
    formData.append('access_token', token)
    formData.append('build_number', DeviceInfo.getBuildNumber());
    dispatch(startLoading())
    return fetch(API_URL + '/api/download/config', {
      method: 'post',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: formData
    })
    .then(res => {
      dispatch(endLoading())
      return res.json()
    })
    .then(json => {
      if (json.hasOwnProperty('error') && json.error == 0) {
        return json.data
      }
      else {
        console.log('Load download config error:' + json)
        return false
      }
    })
    .catch(error => {
      console.log('Load download config exception:' + error)
      dispatch(endLoading())
      return false
    })
  }
}

export function checkUpdate(token)
{
  return (dispatch) => {
    let formData = new FormData()
    formData.append('access_token', token)
    formData.append('build_number', DeviceInfo.getBuildNumber())
    formData.append('os', Platform.OS)
    dispatch(startLoading())
    return fetch(API_URL + '/api/update/check', {
      method: 'post',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: formData
    })
    .then(res => {
      dispatch(endLoading())
      return res.json()
    })
    .then(json => {
      if (json.error == 0 && json.data.must_update) {
        return json.data
      }
      else {
        console.log('Check update error:' + json)
        return false
      }
    })
    .catch(error => {
      console.log('Check update exception:' + error)
      dispatch(endLoading())
      return false
    })
  }
}

export function canEnterGame(token)
{
  return (dispatch) => {
    let formData = new FormData()
    formData.append('access_token', token)
    formData.append('build_number', DeviceInfo.getBuildNumber())
    formData.append('os', Platform.OS)
    console.log(JSON.stringify(formData))
    dispatch(startLoading())
    return fetch(API_URL + '/api/update/enter', {
      method: 'post',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: formData
    })
    .then(res => {
      dispatch(endLoading())
      return res.json()
    })
    .then(json => {
      console.log('Check enter error:' + JSON.stringify(json))
      if (json.error == 0) {
        if (json.data.can_enter) {
          return true
        }
        else {
          return json.data
        }
      }
      else {
        return {"can_enter": false, "update_url": API_URL}
        //return {"can_enter": false, "update_url": "https://play.google.com/store/search?q=" + AppName}
      }
    })
    .catch(error => {
      console.log('Check enter exception:' + error)
      dispatch(endLoading())
      //return {"can_enter": false, "update_url": "https://play.google.com/store/search?q=" + AppName}
      return {"can_enter": false, "update_url": API_URL}
    })
  }
}
