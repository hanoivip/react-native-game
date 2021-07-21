import React from 'react'
import PropTypes from 'prop-types'
import { Button, StyleSheet, Text, TextInput, View, Switch, Alert } from 'react-native'
import { common } from '../styles/app.style'
import { showMessage } from "react-native-flash-message"

export default class HistoryFragment extends React.Component {
  componentDidMount() {
    if (this.props.access_token != null) {
      this.props.loadRechargeHistory(this.props.access_token)
    }
  }
  render()
  {
    let topupHistories = []
    let rechargeHistories = []
    let topups = []
    let recharges = []
    //console.log(this.props.history)
    if (this.props.history != null) {
      topups = this.props.history.submits
      recharges = this.props.history.mods
    }
    if (topups.length > 0) {
      topups.forEach(function (submit, index) {
        topupHistories.push(
          <View key={index} style={{flexDirection: 'row'}}>
            <Text style={{flex: 0.25, borderWidth: 1}}>{submit.serial}</Text>
            <Text style={{flex: 0.25, borderWidth: 1}}>{submit.password}</Text>
            <Text style={{flex: 0.25, borderWidth: 1}}>{submit.message}</Text>
            <Text style={{flex: 0.25, borderWidth: 1}}>{submit.time}</Text>
          </View>
        )
      })
    }
    if (recharges.length > 0) {
      recharges.forEach(function (mod, index) {
        rechargeHistories.push(
          <View key={index} style={{flexDirection: 'row'}}>
            <Text style={{flex: 0.25, borderWidth: 1}}>{mod.balance}</Text>
            <Text style={{flex: 0.25, borderWidth: 1}}>{mod.acc_type}</Text>
            <Text style={{flex: 0.25, borderWidth: 1}}>{mod.reason}</Text>
            <Text style={{flex: 0.25, borderWidth: 1}}>{mod.time}</Text>
          </View>
        )
      })
    }
    if (topupHistories.length > 0 || rechargeHistories.length > 0) {
      return (
        <View>
          <Text>Topup History:</Text>
          {topupHistories}
          <Text>Recharge History:</Text>
          {rechargeHistories}
        </View>
      )
    }
    else {
      return (
        <View>
          <Text>Empty! You have not performed any actions!</Text>
        </View>)
    }
  }
}
