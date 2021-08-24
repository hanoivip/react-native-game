import * as React from 'react'
import {
  createStackNavigator,
} from '@react-navigation/stack'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'

export default function AuthScreen() {
	let Stack = createStackNavigator()
  return (
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{ gestureEnabled: false }}>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}/>
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ headerShown: false }}/>
        </Stack.Navigator>
  )
}
