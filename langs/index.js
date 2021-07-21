import { Locale } from '@env'
import I18n from 'react-native-i18n'
import vi from './locales/vi'
import en from './locales/en'
import tr from './locales/tr'
I18n.translations = {
  vi,
  tr,
  en,
}
I18n.locale = Locale
I18n.fallbacks = true
export default I18n
