import { SERVERS_LOADED, CHARACTERS_LOADED, PRODUCTS_LOADED } from '../actions/Type'
import { SERVERS_LOADED_FAIL, CHARACTERS_LOADED_FAIL, PRODUCTS_LOADED_FAIL } from '../actions/Type'


const initialState = {
  servers: {},
  chars: {},
  error: 0,
  message: null,
}

export default function game(state = initialState, action)
{
  //console.log(action)
  switch (action.type) {
    case SERVERS_LOADED:
      return Object.assign({}, state, {
        servers: action.data.servers
      })
    case CHARACTERS_LOADED:
      //console.log(action.data.roles)
      return Object.assign({}, state, {
        chars: action.data.roles
      })
    case SERVERS_LOADED_FAIL:
    case CHARACTERS_LOADED_FAIL:
      return Object.assign({}, state, {
        error: action.error,
        message: action.message,
      })
    default:
      return state
  }
}
