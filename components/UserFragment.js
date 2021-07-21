import React from 'react'
import PropTypes from 'prop-types'
import { Container, Content, Header, Left, Right, Body, Title, Text, Button, Card, CardItem, Input, Form, Item, Label, Footer, FooterTab, Icon } from 'native-base'


export default class UserFragment extends React.Component
{
  componentDidMount()
  {
    if (this.props.user_info == null)
      this.props.authGetInfo(this.props.access_token)
    if (this.props.balance_info == null)
      this.props.loadBalanceInfo(this.props.access_token)
  }
  render()
  {
    let info = (<Text>Loading user info..</Text>)
    if (this.props.user_info != null) {
      info = (
        <Card>
          <CardItem header>
            <Label>User information</Label>
          </CardItem>
          <CardItem>
            <Text>Username: {this.props.user_info['name']}</Text>
          </CardItem>
          <CardItem>
            <Text>Email: {this.props.user_info['email']}</Text>
          </CardItem>
        </Card>
      )
    }
    let balanceInfo = (<Text>Loading balance info...</Text>)
    if (this.props.balance_info != null) {
      let balances = []
      //console.log(this.props.balance_info)
      this.props.balance_info.forEach(function(balance, index) {
        balances.push(
          <CardItem key={index}>
            <Text>Balance type: {balance.type}</Text>
            <Text>Balance: {balance.balance}</Text>
          </CardItem>
        )
      })
      balanceInfo = (
        <Card>
          <CardItem header>
            <Label>Detail balance info:</Label>
          </CardItem>
          {balances}
        </Card>
      )
    }
    else {

    }
    return (
      <Container style={{height: '100%'}}>
        <Content padder>
          {info}
          {balanceInfo}
          <Button title="Logout" accessibilityLabel="Logout"
            onPress={() => this.props.authLogout(this.props.access_token)}>
            <Text>Logout</Text>
          </Button>
        </Content>

      </Container>
    )
  }
}
