//Define what to export

import { checkAuthCookies, authLogin, authRegister, authGetInfo, authLogout,
  authGuest, bindGuest } from './AuthApi'
import { loadDownloadConfig, checkUpdate, canEnterGame} from './DownloadApi'
import { loadServers, loadCharacters, requestRecharge} from './GameApi'

export {
checkAuthCookies, authLogin, authRegister, authGetInfo, authLogout, authGuest, bindGuest,

loadDownloadConfig, checkUpdate, canEnterGame,

loadServers, loadCharacters, requestRecharge
}
