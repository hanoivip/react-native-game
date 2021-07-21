import * as React from 'react'
import { View, Dimensions, Text, TextInput, Platform, DevSettings } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { wrapper, header, main, footer } from '../styles/app.style'
import CardRule from './CardRule'
import { showMessage } from "react-native-flash-message"
import I18n from '../langs'
import { Container, Content, Header, Left, Right, Body, Title, Button, Card, CardItem, Input, Form, Item, Label, Footer, FooterTab, Icon } from 'native-base'


export default class CardFragment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      serial: "",
      password: "",
    }
  }
  componentDidMount() {
  }
  goBack()
  {
    this.setState({serial: "", password: ""})
    this.props.back()
  }
  async submitCard()
  {
    const token = this.props.access_token
    const route = this.props.route
    const serial = this.state.serial
    const password = this.state.password
    //console.log('submit card detail ' + serial + ' ' + password)
    if (serial == "" || password == "") {
      showMessage({
        message: I18n.t('topup'),
        description: I18n.t('topupRequiredValues'),
        type: "danger",
      })
      return
    }
    let result = await this.props.endTopup(token, route, serial, password)
    if (typeof result == "string") {
      showMessage({
        message: I18n.t('topup'),
        description: result,
        type: "danger",
      })
    }
    else {
      if (result.hasOwnProperty('error_message')) {
        showMessage({
          message: I18n.t('topup'),
          description: result.error_message,
          type: "danger",
        })
        this.goBack()
      }
      if (result.hasOwnProperty('message')) {
        showMessage({
          message: I18n.t('topup'),
          description: result.message,
          type: "success",
        })
        this.goBack()
      }
    }
  }
  render()
  {
      return (
        <Container style={{height: '100%'}}>
          <Header>
            <Label>Topup with prepaid telco card</Label>
          </Header>
          <Content>
            <Form>
              <Item>
                <Label>Card Serial</Label>
                <Input value={this.state.serial}
                  onChangeText={(val) => this.setState({serial: val})}/>
              </Item>
              <Item>
                <Label>Card password</Label>
                <Input value={this.state.password}
                  onChangeText={(val) => this.setState({password: val})}/>
              </Item>
            </Form>
          </Content>
          <Footer>
            <FooterTab>
              <Button onPress={this.submitCard.bind(this)}>
                <Icon name='credit'/>
                <Text>OK</Text>
              </Button>
              <Button onPress={this.goBack.bind(this)}>
                <Icon name='close'/>
                <Text>Cancel</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>)
  }
}
