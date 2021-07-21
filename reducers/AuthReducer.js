import {LOGIN_SUCCESS, LOGIN_FAILURE} from '../actions/Type'
import {REGISTER_SUCCESS, REGISTER_FAILURE} from '../actions/Type'
import {USER_INFO_LOADED, USER_INFO_FAIL} from '../actions/Type'
import {LOGGED_OUT} from '../actions/Type'
import {QUICKPLAY_SUCCESS, QUICKPLAY_FAIL} from '../actions/Type'

const initialState = {
  access_token: null,
  app_user_id: 0,
  expire_date: 0,
  user_info: null,
  logged_in: false,
  fail_count: 0,
  error: null,
  message: null,
  validators: null,
  lock_down: 0,
  captcha: false,
  guest_mode: false,
}

export default function auth(state = initialState, action)
{
  //console.log(action)
  switch (action.type)
  {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        access_token: action.data.token,
        expire_date: action.data.expire,
        app_user_id: action.data.app_user_id,
        logged_in: true,
        error: null,
        fail_count: 0,
        lock_down: 0,
        captcha: false,
      })
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return Object.assign({}, state, {
        error: action.error,
        message: action.message,
        fail_count: state.fail_count+1,
        validators: action.validators
      })
    case USER_INFO_LOADED:
      return Object.assign({}, state, {
        user_info: action.data,
        guest_mode: action.data.is_guest
      })
    case USER_INFO_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        message: action.message,
      })
    case LOGGED_OUT:
      return Object.assign({}, state, {
        access_token: null,
        app_user_id: 0,
        user_info: null,
        expire_date: 0,
        logged_in: false,
        error: null,
        fail_count: 0,
        lock_down: 0,
        captcha: false,
        guest_mode: false,
      })
    case QUICKPLAY_SUCCESS:
      return Object.assign({}, state, {
        access_token: action.data.token,
        expire_date: action.data.expire,
        app_user_id: action.data.app_user_id,
        logged_in: true,
        error: null,
        fail_count: 0,
        lock_down: 0,
        captcha: false,
        guest_mode: true,
      })
    default:
      return state
  }
}
