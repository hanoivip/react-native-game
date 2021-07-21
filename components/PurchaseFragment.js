import React from 'react'
import PropTypes from 'prop-types'
import { Button, StyleSheet, Text, TextInput, View, Switch, Alert, Picker } from 'react-native';

import ServerList from './ServerList'
import RoleList from './RoleList'
import ProductList from './ProductList'

import { common, wrapper, header, main, footer } from '../styles/app.style'
import { showMessage } from "react-native-flash-message"

import I18n from '../langs'

export default class PurchaseFragment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedSv: null,
      selectedRole: null,
      selectedProductId: null,
    }
  }

  async componentDidMount() {
    this.props.loadServers(this.props.access_token)
    this.props.loadProducts(this.props.access_token)
    await this.props.payInit()
  }
  onSelectServer(server) {
    if (server != this.state.selectedSv) {
      if (!this.props.chars.hasOwnProperty(server))
        this.props.loadCharacters(this.props.access_token, server)
      // use cache here, until manual refresh
    }
    this.setState({selectedSv: server, selectedRole: null, selectedProductId: null})
  }
  onSelectRole(role) {
    this.setState({selectedRole: role, selectedProductId: null})
  }
  async purchase(product) {
    //console.log('start purchase ' + product.merchant_id)
    this.setState({selectedProductId: product.merchant_id})
    // create order and trigger platform payment
    let order = await this.props.createOrder(this.props.access_token, this.state.selectedSv, this.state.selectedRole, product.merchant_id)
    if (order == false) {
      {
        showMessage({
          message: I18n.t('purchase'),
          description: I18n.t('purchaseOrderFailure'),
          type: "danger",
        })
      }
    }
    else {
      // just trigger platform payment
      this.props.payOrder(this.props.access_token, order.order, this.state.selectedProductId)
    }
  }

  async onOrderPaid()
  {
    let result = await this.props.payCallback(this.props.access_token, this.props.order, this.props.receipt)
    if (result == true) {
      showMessage({
        message: I18n.t('purchase'),
        description: I18n.t('purchaseSuccess'),
        type: "success",
      })
    }
    else {
      showMessage({
        message: I18n.t('purchase'),
        description: I18n.t('purchaseCallbackFailure'),
        type: "danger",
      })
    }
  }

  render()
  {
    const selectedSv = this.state.selectedSv
    const selectedRole = this.state.selectedRole
    const message = this.props.message
    if (this.props.need_callback)
    {
      this.onOrderPaid()
    }

    return (
      <View>
        { message != null ? (<Text style={common.failure}>{message}</Text>) : (<Text></Text>)}
        <ServerList selected={selectedSv} data={this.props.servers} onSelectServer={this.onSelectServer.bind(this)}/>
        { selectedSv != null ? (
          <RoleList selected={selectedRole} data={this.props.chars} onSelectRole={this.onSelectRole.bind(this)}/>
        ) : (
          <Text></Text>
        )}
        { selectedSv != null && selectedRole != null ? (
          <ProductList data={this.props.products} onPurchase={this.purchase.bind(this)}/>
        ) : (
          <Text></Text>
        )}
      </View>
    )
  }
}
