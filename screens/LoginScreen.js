import * as React from 'react'
import LoginContainer from '../containers/LoginContainer'

export default function LoginScreen({ navigation }) {
  return (
      <LoginContainer openRegister={() => navigation.push('RegisterScreen')}/>
  );
}
