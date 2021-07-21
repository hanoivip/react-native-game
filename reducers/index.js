import { combineReducers } from 'redux'
import auth from './AuthReducer'
import ui from './UiReducer'
import game from './GameReducer'
import purchase from './PurchaseReducer'
import gate from './GateReducer'

const homeApp = combineReducers({
  auth,
  ui,
  game,
  purchase,
  gate
})

export default homeApp
