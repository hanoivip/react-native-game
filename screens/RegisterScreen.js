import * as React from 'react'
import RegisterContainer from '../containers/RegisterContainer'

export default function RegisterScreen({ navigation }) {
  return (
    <RegisterContainer back={() => navigation.pop()}/>
  )
}
