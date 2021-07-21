import * as React from 'react'
import { ScrollView } from 'react-native'

import TopupContainer from '../containers/TopupContainer'
import TopMenuFragment from '../components/TopMenuFragment'

export default function CardInputScreen({ navigation }) {
  return (
    <ScrollView>
      <TopMenuFragment toggleMenu={() => navigation.toggleDrawer()}/>
      <TopupContainer onSelectCard={() => navigation.push('CardInput')}/>
    </ScrollView>
  )
}
