import * as React from 'react'
import {
  createStackNavigator,
} from '@react-navigation/stack'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'

const Stack = createStackNavigator()
export default function AuthScreen() {
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
