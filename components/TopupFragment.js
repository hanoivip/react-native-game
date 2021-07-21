import * as React from 'react'
import { View, Button, Dimensions, Text, TextInput, Platform, DevSettings } from 'react-native'
import { wrapper, header, main, footer } from '../styles/app.style'

import CardList from './CardList'
import CardRule from './CardRule'
import { showMessage } from "react-native-flash-message"

import I18n from '../langs'

export default class TopupFragment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      route: null,
    }
  }
  componentDidMount() {
    this.props.loadGateConfig(this.props.access_token)
    this.props.loadGateRule(this.props.access_token)
  }
  async selectCard(type, amount)
  {
    console.log("select " +  type + " amount " + amount)
    let route = await this.props.beginTopup(this.props.access_token, type, amount)
    if (typeof route == "string") {
      showMessage({
        message: I18n.t('topup'),
        description: route,
        type: "danger",
      })
    }
    else {
      console.log("popup card detail modal or stack.." + JSON.stringify(route))
      if (!route.available || route.busy) {
        showMessage({
          message: I18n.t('topup'),
          description: I18n.t('topupBusy'),
          type: "danger",
        })
        return
      }
      await this.props.onSelectCard()
    }
  }

  render()
  {
    if (this.props.config == null) {
      return (<Text>{I18n.t('topupMaintainance')}</Text>)
    }
    else {
      return (
        <View>
          <CardList data={this.props.config} onSelect={this.selectCard.bind(this)} />
          <CardRule data={this.props.rule} />
        </View>
      )
    }
  }
}
