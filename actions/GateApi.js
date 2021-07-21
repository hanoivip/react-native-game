import { BALANCE_INFO_LOADED } from '../actions/Type'
import { GATE_CONFIG_LOADED, GATE_CONFIG_LOADED_FAIL } from '../actions/Type'
import { GATE_RULE_LOADED, GATE_RULE_LOADED_FAIL } from '../actions/Type'
import { GATE_CARD_ROUTED, GATE_CARD_ROUTED_FAIL } from '../actions/Type'
import { GATE_CARD_SUCCESS, GATE_CARD_FAIL } from '../actions/Type'
import { HISTORY_INFO_LOADED } from '../actions/Type'
import { API_URL } from "@env"
import { startLoading, endLoading } from './UiApi'

export function loadGateConfig(token)
{
  return (dispatch) => {
    dispatch(startLoading())
    return fetch(API_URL + '/api/topup?access_token=' + token, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      }
    })
    .then(res => {
      dispatch(endLoading())
      return res.json()
    })
    .then(json => dispatch(gateConfigLoadedSuccess(json)))
    .catch(error => {
      dispatch(endLoading())
      dispatch(gateConfigLoadedFail(error, "Load gate config exception"))
    })
  }
}
const gateConfigLoadedSuccess = (data) => ({ type: GATE_CONFIG_LOADED, data })
const gateConfigLoadedFail = (error, message) => ({ type: GATE_CONFIG_LOADED_FAIL, error, message})

export function loadGateRule(token)
{
  return (dispatch) => {
    dispatch(startLoading())
    return fetch(API_URL + '/api/topup/rule?access_token=' + token, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      }
    })
    .then(res => {
      dispatch(endLoading())
      return res.json()
    })
    .then(json => dispatch(gateRuleLoadedSuccess(json)))
    .catch(error => {
      dispatch(endLoading())
      dispatch(gateRuleLoadedFail(error, "Load gate config exception"))
    })
  }
}
const gateRuleLoadedSuccess = (data) => ({ type: GATE_RULE_LOADED, data })
const gateRuleLoadedFail = (error, message) => ({ type: GATE_RULE_LOADED_FAIL, error, message})


export function beginTopup(token, type, amount)
{
  return (dispatch) => {
    let formData = new FormData()
    formData.append('access_token', token)
    formData.append('type', type)
    formData.append('dvalue', amount)
    dispatch(startLoading())
    return fetch(API_URL + '/api/topup/select', {
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
      dispatch(gateRouteLoadedSuccess(json.result))
      return json.result
    })
    .catch(error => {
      dispatch(endLoading())
      dispatch(gateRouteLoadedFail(error, "Card routing exception"))
      return "Topup Exception 1. Plz try again later."
    })
  }
}
const gateRouteLoadedSuccess = (data) => ({ type: GATE_CARD_ROUTED, data })
const gateRouteLoadedFail = (error, message) => ({ type: GATE_CARD_ROUTED_FAIL, error, message})

export function endTopup(token, route, serial, password)
{
  return (dispatch) => {
    let formData = new FormData()
    formData.append('access_token', token)
    formData.append('type', route.type)
    formData.append('pid', route.pid)
    formData.append('sid', route.sid)
    formData.append('dvalue', route.dvalue)
    formData.append('serial', serial)
    formData.append('password', password)
    dispatch(startLoading())

    return fetch(API_URL + '/api/topup/do', {
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
      return json.result
    })
    .catch(error => {
      dispatch(endLoading())
      return "Topup Exception 2. Plz try again later."
    })
  }
}

export function loadBalanceInfo(token)
{
  return (dispatch) => {
    let formData = new FormData()
    formData.append('access_token', token)
    dispatch(startLoading())
    return fetch(API_URL + '/api/topup/info', {
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
      if (json.error == 0) {
        dispatch(loadBalanceInfoSuccess(json.data))
        return true
      }
      else {
        return false
      }
    })
    .catch(error => {
      dispatch(endLoading())
      return false
    })
  }
}
const loadBalanceInfoSuccess = (data) => ({ type: BALANCE_INFO_LOADED, data })

export function loadRechargeHistory(token)
{
  return (dispatch) => {
    let formData = new FormData()
    formData.append('access_token', token)
    dispatch(startLoading())
    return fetch(API_URL + '/api/topup/history', {
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
      dispatch(loadRechargeHistorySuccess(json))
      return true
    })
    .catch(error => {
      dispatch(endLoading())
      return false
    })
  }
}
const loadRechargeHistorySuccess = (data) => ({ type: HISTORY_INFO_LOADED, data })
