import DeviceInfo from 'react-native-device-info'

export function getDeviceId()
{
  return (dispatch) => {
    return DeviceInfo.getMacAddress().then(mac => {return mac})
  }
}

export function getDeviceInfo()
{
  return (dispatch) => {
    let params = {}
    return params
  }
}
