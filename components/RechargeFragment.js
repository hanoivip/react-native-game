import * as React from 'react'
import { View, Button, Dimensions, Text, Platform, DevSettings } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { common, wrapper, header, main, footer } from '../styles/app.style'

import ServerList from './ServerList'
import RoleList from './RoleList'
import ProductList from './ProductList'
import { showMessage } from "react-native-flash-message"

import I18n from '../langs'
import { Container, Card, Icon, Picker, CardItem, Label, Content } from "native-base"

export default class RechargeFragment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSv: null,
      selectedRole: null,
      selectedProduct: null,
    }
  }
  componentDidMount() {

    this.loadServers()
    this.loadProducts()
  }
  loadServers()
  {
    this.props.loadServers(this.props.access_token)
  }
  loadProducts()
  {
    this.props.loadProducts(this.props.access_token)
  }
  onSelectServer(server) {
    if (server != this.state.selectedSv && server != undefined) {
      //console.log(server.name + ' ' + server.ident)
      if (!this.props.chars.hasOwnProperty(server))//server.name
        this.props.loadCharacters(this.props.access_token, server)
      // use cache here, until manual refresh
    }
    this.setState({...this.state, selectedSv:server})
  }
  onSelectRole(role) {
    this.setState({selectedRole: role})
  }
  recharge(product)
  {
    if (!this.props.hasOwnProperty('requestRecharge'))
    {
      throw new Error("You have to define requestRecharge callback")
    }
    const server=this.state.selectedSv
    const role=this.state.selectedRole
    this.props.startLoading()
    this.props.requestRecharge(
      this.props.access_token,
      server,
      role,
      product)
    .then(result => {
      this.props.endLoading()
      if (result) {
        if (result.error == 0)
        {
          showMessage({
            message: I18n.t('recharge'),
            description: I18n.t('rechargeSuccess'),
            type: "success",
          })
        }
        else {
          showMessage({
            message: I18n.t('recharge'),
            description: result.message,
            type: "danger",
          })
        }
      }
      else {
        showMessage({
          message: I18n.t('recharge'),
          description: I18n.t('rechargeFailure'),
          type: "danger",
        })
      }
    })
    this.setState({selectedProduct: product})
  }
  render()
  {
    const selectedSv = this.state.selectedSv
    const selectedRole = this.state.selectedRole
    const message = this.props.message
    return (
      <Container style={{height: '100%'}}>
        <Content padder>
          { message != null ? (<Label style={common.failure}>{message}</Label>) : (<Label/>)}
          <ServerList selected={selectedSv} data={this.props.servers}
            onSelectServer={(server) => this.onSelectServer(server)}
            reload={this.loadServers.bind(this)} />
          { selectedSv != null ? (
            <RoleList selected={selectedRole} data={this.props.chars} onSelectRole={this.onSelectRole.bind(this)}/>
          ) : (
            <Text></Text>
          )}
          { selectedSv != null && selectedRole != null ? (
            <ProductList data={this.props.products}
              onPurchase={(product) => this.recharge(product)}
              reload={this.loadProducts.bind(this)}/>
          ) : (
            <Text></Text>
          )}
        </Content>
      </Container>
    )
  }
}
