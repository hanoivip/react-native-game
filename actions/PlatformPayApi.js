import { API_URL } from '@env'
import { requestRecharge } from '../actions/GameApi'

export const platformIapHelper = async (order, item) => {
  console.log('Pay on web by credit')
  return true
}

export const platformIapInit = async () => {
  console.log('Pay on web..')
  return true
}
