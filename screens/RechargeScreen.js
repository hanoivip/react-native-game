import * as React from 'react'
import { ScrollView } from 'react-native'
import RechargeContainer from '../containers/RechargeContainer'
import TopMenuFragment from '../components/TopMenuFragment'
import { payInit, pay } from '../actions/PurchaseApi'

function iapRequestRecharge(token, server, role, recharge)
{
  // check config..
  // google iap
  return pay(token, server, role, recharge)
  // apple iap
}

export default function RechargeScreen({ navigation }) {
  payInit()
  return (
    <ScrollView>
      <TopMenuFragment toggleMenu={() => navigation.toggleDrawer()}/>
      <RechargeContainer requestRecharge={(token, server, role, recharge) => iapRequestRecharge(token, server, role, recharge)}/>
    </ScrollView>
  )
}
