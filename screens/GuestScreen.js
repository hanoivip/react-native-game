import * as React from 'react'
import { ScrollView } from 'react-native'
import GuestContainer from '../containers/GuestContainer'
import TopMenuFragment from '../components/TopMenuFragment'

export default function GuestScreen({ navigation }) {
  return (
    <ScrollView>
      <TopMenuFragment toggleMenu={() => navigation.toggleDrawer()}/>
      <GuestContainer/>
    </ScrollView>
  )
}
