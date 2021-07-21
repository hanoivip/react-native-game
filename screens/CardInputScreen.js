import * as React from 'react'
import { ScrollView } from 'react-native'
import CardContainer from '../containers/CardContainer'

export default function CardInputScreen({ navigation }) {
  return (
    <ScrollView>
      <CardContainer back={() => navigation.pop()}/>
    </ScrollView>
  )
}
