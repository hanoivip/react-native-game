import DeviceInfo from 'react-native-device-info'
import AsyncStorage from '@react-native-async-storage/async-storage'

const COOKIE_DEVICE_KEY = 'uss_device'

export function getDeviceId()
{
    return AsyncStorage.getItem(COOKIE_DEVICE_KEY)
      .then(device => {
        if (!device)
        {
          device = Math.random().toString(36).substring(2)
          AsyncStorage.setItem(COOKIE_DEVICE_KEY, device)
        }
        return device
      })
      .catch(error => {
        console.log("Get device error:" + error.message)
        AsyncStorage.clear()
      })
}

export function getDeviceInfo()
{
  return (dispatch) => {
    let params = {}
    return params
  }
}
