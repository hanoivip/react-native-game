import { PRODUCTS_LOADED, PRODUCTS_LOADED_FAIL } from '../actions/Type'
import { ORDER_CREATED, ORDER_CREATED_FAIL } from '../actions/Type'
import { ORDER_PAID, ORDER_PAID_FAIL } from '../actions/Type'
import { ORDER_CALLBACK_SUCCESS, ORDER_CALLBACK_FAIL } from '../actions/Type'

const initialState = {
  products: {},
  order: null,
  error: null,
  message: null,
  paid: false,
  need_callback: false,
  receipt: null,
  fail_count: 0,
}

export default function purchase(state = initialState, action)
{
  //console.log(action)
  switch (action.type) {
    case PRODUCTS_LOADED:
      return Object.assign({}, state, {
        products: action.data.items
      })
    case ORDER_PAID_FAIL:
    case ORDER_CREATED_FAIL:
    case PRODUCTS_LOADED_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        message: action.message
      })
    case ORDER_CREATED:
      return Object.assign({}, state, {
        order: action.data.order,
        error: null,
        message: null,
      })
    case ORDER_PAID:
      return Object.assign({}, state, {
        paid: true,
        need_callback: true,
        error: null,
        message: null,
        receipt: action.data
      })
    case ORDER_CALLBACK_SUCCESS:
      return Object.assign({}, state, {
        paid: false,
        need_callback: false,
        error: null,
        message: null,
        receipt: null,
      })
    case ORDER_CALLBACK_FAIL:
      return Object.assign({}, state, {
        paid: false,
        need_callback: false,
        error: action.error,
        message: action.message,
        fail_count: state.fail_count+1,
      })
    default:
      return state
  }
}
