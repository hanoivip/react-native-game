import * as React from 'react'
import { ScrollView } from 'react-native'
import GiftContainer from '../containers/GiftContainer'
import TopMenuFragment from '../components/TopMenuFragment'

export default function GiftScreen({ navigation }) {
  return (
    <ScrollView>
      <TopMenuFragment toggleMenu={() => navigation.toggleDrawer()}/>
      <GiftContainer back={() => navigation.pop()}/>
    </ScrollView>
  )
}
