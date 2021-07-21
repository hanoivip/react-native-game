import * as React from 'react'
import {
  createStackNavigator,
} from '@react-navigation/stack'
import CardListScreen from './CardListScreen'
import CardInputScreen from './CardInputScreen'

const Stack = createStackNavigator()
export default function TopupScreen({ navigation }) {
  return (
      <Stack.Navigator
        initialRouteName="CardList"
        screenOptions={{ gestureEnabled: false }}>
          <Stack.Screen
            name="CardList"
            component={CardListScreen}
            options={{ headerShown: false }}/>
          <Stack.Screen
            name="CardInput"
            component={CardInputScreen}
            options={{ headerShown: false }}
            initialParams={{ user: 'me' }}/>
        </Stack.Navigator>
  )
}
