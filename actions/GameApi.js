import { API_URL } from '@env'
import { SERVERS_LOADED, CHARACTERS_LOADED } from './Type'
import { SERVERS_LOADED_FAIL, CHARACTERS_LOADED_FAIL } from './Type'
import { GAME_RECHARGE_SUCCESS } from './Type'
import { startLoading, endLoading } from './UiApi'

export function loadServers(token) {
  return (dispatch) => {
    dispatch(startLoading())
    return fetch(API_URL + '/api/server/list?access_token=' + token, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      }
    })
    .then(res => {
      //console.log(res)
      dispatch(endLoading())
      return res.json()
    })
    .then(json => dispatch(serversLoadedSuccess(json)))
    .catch(error => {
      //console.log(error)
      dispatch(endLoading())
      dispatch(serversLoadedFail(error, "Load server lists exception"))
    })
  }
}
export const serversLoadedSuccess = (data) => ({ type: SERVERS_LOADED, data })
export const serversLoadedFail = (error, message) => ({ type: SERVERS_LOADED_FAIL, error, message })

export function loadCharacters(token, server)
{
  return (dispatch) => {
    let formData = new FormData()
    formData.append('access_token', token)
    formData.append('svname', server)
    dispatch(startLoading())
    return fetch(API_URL + '/api/user/role', {
      method: 'post',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      }
    })
    .then(res => {
      dispatch(endLoading())
      return res.json()
    })
    .then(json => dispatch(charactersLoadedSuccess(json)))
    .catch(error => {
      dispatch(endLoading())
      dispatch(charactersLoadedFail(error, "Load character list exception"))
    })
  }
}
export const charactersLoadedSuccess = (data) => ({ type: CHARACTERS_LOADED, data })
export const charactersLoadedFail = (error, message) => ({ type: CHARACTERS_LOADED_FAIL, error, message })

export function requestRecharge(token, server, role, productId, price)
{
  return (dispatch) => {
    let formData = new FormData()
    formData.append('svname', server)
    formData.append('package', productId)
    formData.append('roleid', role)
    formData.append('access_token', token)
    dispatch(startLoading())
    return fetch(API_URL + '/api/game/recharge', {
      method: 'post',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      }
    })
    .then(res => {
      dispatch(endLoading())
      return res.json()
    })
    .then(json => {
      // json.message save message somewhre
      dispatch(requestRechargeSuccess(price))
      return json.error == 0;
    })
    .catch(error => {
      dispatch(endLoading())
      return false;
    })
  }
}
const requestRechargeSuccess = (data) => ({ type: GAME_RECHARGE_SUCCESS, data})

export function useGift(token, server, role, code)
{
  return (dispatch) => {
    let formData = new FormData()
    formData.append('svname', server)
    formData.append('code', code)
    formData.append('roleid', role)
    formData.append('access_token', token)
    return fetch(API_URL + '/api/gift/use', {
      method: 'post',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      }
    })
    .then(res => {
      return res.json()
    })
    .then(json => {
      if (json.error == 0)
        return true;
      return json;
    })
    .catch(error => {
      return {code: 99, message: error};
    })
  }
}
