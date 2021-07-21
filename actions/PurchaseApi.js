import { Platform } from 'react-native'
import { API_URL } from '@env'
import { platformIapHelper, platformIapInit } from './PlatformPayApi'
import { PRODUCTS_LOADED, PRODUCTS_LOADED_FAIL } from './Type'
import { ORDER_CREATED, ORDER_CREATED_FAIL } from './Type'
import { ORDER_PAID, ORDER_PAID_FAIL } from './Type'
import { ORDER_CALLBACK_SUCCESS, ORDER_CALLBACK_FAIL } from './Type'
import { startLoading, endLoading } from './UiApi'

export function loadProducts(token)
{
  return (dispatch) => {
    let formData = new FormData()
    formData.append('access_token', token)
    dispatch(startLoading())
    return fetch(API_URL + '/api/iap/items', {
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
    .then(json => dispatch(productsLoadedSuccess(json)))
    .catch(error => {
      dispatch(endLoading())
      dispatch(productsLoadedFailure(error, "Load products exception"))
    })
  }
}
export const productsLoadedSuccess = (data) => ({ type: PRODUCTS_LOADED, data})
export const productsLoadedFailure = (error, message) => ({ type: PRODUCTS_LOADED_FAIL, error, message})

export function createOrder(token, server, role, product)
{
  //return (dispatch) => {
    let formData = new FormData()
    formData.append('access_token', token)
    formData.append('svname', server)
    formData.append('role', role)
    formData.append('item', product)
    //console.log(JSON.stringify(formData))
    //dispatch(startLoading())
    return fetch(API_URL + '/api/order', {
      method: 'post',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: formData
    })
    .then(res => {
      //dispatch(endLoading())
      return res.json()
    })
    .then(json => {
      //dispatch(endLoading())
      if (!json.hasOwnProperty('error'))
      {
        console.log("Create order exception 1:" + JSON.stringify(json))
        return false
      }
      if (json.error == 0)
      {
        //dispatch(orderCreatedSuccess(json.data))
        return json.data
      }
      else {
        //dispatch(orderCreatedFailure(1, "Create order error"))
        console.log("Create order error:" + json.error)
        return false
      }
    })
    .catch(error => {
      //dispatch(endLoading())
      //dispatch(orderCreatedFailure(error, "Create order exception"))
      console.log("Create order exception:" + error.message )
      return false
    })
  //}
}
export const orderCreatedSuccess = (data) => ({ type: ORDER_CREATED, data})
export const orderCreatedFailure = (error, message) => ({ type: ORDER_CREATED_FAIL, error, message})

export function payInit()
{
  const init = Platform.select({
    ios: () => {
      console.log('Need Apple pay init..')
      return true
    },
    android: () => {
      const ret = platformIapInit()
      return ret
    },
    default: () => {
      const ret = platformIapInit()
      return ret
    }
  })
  return init()
}

export function pay(token, server, role, recharge)
{
  // 1. create order
  return createOrder(token, server, role, recharge.merchant_id)
  .then(order => {
    //console.log("order created: " + JSON.stringify(order))
    if (order)
    {
      // 2. pay order
      return payOrder(token, order.order, recharge.merchant_id)
      .then(receipt => {
        console.log(JSON.stringify(receipt))
        if (receipt)
        {
          // 3. callback order
          return payCallback(token, order.order, receipt)
          .then(result => {
            return result
          })
        }
        return false
      })
    }
    return false
  })
}

export function payOrder(token, order, item)
{
  const payByFlatform = Platform.select({
    ios: (token, order, item) => {
      console.log('Need Apple IAP')
      return false
    },
    android: (token, order, item) => {
      const ret = platformIapHelper(order, item)
      return ret
    },
    default: (token, order, item) => {
      const ret = platformIapHelper(order, item)
      return ret
    }
  })
  return payByFlatform(token, order, item)
}

export function payCallback(token, order, receipt)
{
//  return (dispatch) => {
    //console.log('pay callback .......' + receipt)
    let formData = new FormData()
    formData.append('access_token', token)
    formData.append('order', order)
    formData.append('receipt', JSON.stringify(receipt))
//    dispatch(startLoading())
    return fetch(API_URL + '/api/purchase/callback', {
      method: 'post',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: formData
    })
    .then(res => {
//      dispatch(endLoading())
      return res.json()
    })
    .then(json => {
      if (json.error == 0) {
//        dispatch(orderCallbackSuccess())
        return true
      }
      else {
//        dispatch(orderCallbackFailure(json.error, json.message))
        return false
      }
    })
    .catch(error => {
//      dispatch(endLoading())
      console.error('order callback exception:' + error)
//      dispatch(orderCallbackFailure(error, "Callback exception"))
      return false
    })
//  }
}
export const orderCallbackSuccess = () => ({ type: ORDER_CALLBACK_SUCCESS })
export const orderCallbackFailure = (error, message) => ({ type: ORDER_CALLBACK_FAIL, error, message })
