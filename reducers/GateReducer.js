import { BALANCE_INFO_LOADED } from '../actions/Type'
import { GATE_CONFIG_LOADED } from '../actions/Type'
import { GATE_RULE_LOADED } from '../actions/Type'
import { GATE_CARD_ROUTED } from '../actions/Type'
import { GATE_CARD_SUCCESS } from '../actions/Type'
import { HISTORY_INFO_LOADED } from '../actions/Type'
import { GAME_RECHARGE_SUCCESS } from '../actions/Type'

const initialState = {
  config: null,
  rule: null,
  error: 0,
  message: null,
  user_info: null,
  history: null,
  route: null,
}

export default function gate(state = initialState, action)
{
  //console.log(action)
  switch (action.type)
  {
    case GATE_CONFIG_LOADED:
      return Object.assign({}, state, {
        config: action.data
      })
    case GATE_RULE_LOADED:
      return Object.assign({}, state, {
        rule: action.data.html
      })
    case BALANCE_INFO_LOADED:
      return Object.assign({}, state, {
        user_info: action.data.balances
      })
    case HISTORY_INFO_LOADED:
      return Object.assign({}, state, {
        history: action.data
      })
    case GAME_RECHARGE_SUCCESS:
      const amount = action.data.price
      let balances = state.user_info
      if (balances != null) {
        balances.forEach(function(balance, index) {
          if (balance.type == 0) {
            balance.balance -= parseInt(amount)
          }
        })
      }
      return Object.assign({}, state, {
        user_info: balances
      })
    case GATE_CARD_ROUTED:
      return Object.assign({}, state, {
        route: action.data
      })
    default:
      return state
  }
}
