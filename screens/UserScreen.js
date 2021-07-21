import * as React from 'react'
import { ScrollView } from 'react-native'
import UserContainer from '../containers/UserContainer'
import TopMenuFragment from '../components/TopMenuFragment'

export default function UserScreen({ navigation }) {
  return (
    <ScrollView>
      <TopMenuFragment toggleMenu={() => navigation.toggleDrawer()}/>
      <UserContainer/>
    </ScrollView>
  )
}
