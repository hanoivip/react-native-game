import React from 'react'
import PropTypes from 'prop-types'
import { Container, Content, Header, Left, Right, Body, Title, Text, Button, Card, CardItem, Input, Form, Item, Label, Footer, FooterTab, Icon } from 'native-base'
import I18n from '../i18n/i18n'
import { showMessage } from 'react-native-flash-message'
import { common } from '../styles/app.style'
import { View } from 'react-native'

export default class GuestFragment extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      message: '',
      username: '',
      password: '',
      repassword: '',
      validators: null,
    }
  }
  bindGuest()
  {
    const username = this.state.username
    const password = this.state.password
    const repassword = this.state.repassword
    const token = this.props.access_token
    this.setState({message: ''})
    if (username == '' || password == '' || repassword == '') {
      this.setState({message: I18n.t('registerEmptyInput')})
      return
    }
    if (password != repassword) {
      this.setState({message: I18n.t('registerPassNotMatch')})
      return
    }
    this.props.bindGuest(token, username, password)
    .then(result => {
      if (result === true) {
        showMessage({
          message: I18n.t('bind'),
          description: I18n.t('bindSuccess'),
          type: "success",
        })
      }
      else {
        showMessage({
          message: I18n.t('bind'),
          description: I18n.t('bindFailure'),
          type: "danger",
        })
        console.log(JSON.stringify(result))
        this.setState({validators: result, message: result.error})
      }
    })
  }
  render()
  {
    const validators = this.state.validators
    let usernameError = null
    let passwordError = null
    if (validators != null) {
      if (validators.hasOwnProperty('username')) {
        usernameError = <Text style={common.validator}>{validators.username}</Text>
      }
      else if (validators.hasOwnProperty('name')) {
        usernameError = <Text style={common.validator}>{validators.name}</Text>
      }
      if (validators.hasOwnProperty('password')) {
        passwordError = <Text style={common.validator}>{validators.password}</Text>
      }
    }
    return (
      <Container style={{height: '100%'}}>
      <Header>
        <Body>
          <Title>You should bind your account, now!</Title>
        </Body>
      </Header>
        <Content padder>
          <Form>
            <Item>
              <Label>Username</Label>
              <Input onChangeText={(val) => this.setState({username: val})} value={this.state.username}/>
            </Item>
            { usernameError ? (
              <Item>
                <Label>{usernameError}</Label>
              </Item>) : (<View/>) }
            <Item>
              <Label>Password</Label>
              <Input onChangeText={(val) => this.setState({password: val})} value={this.state.password} secureTextEntry={true}/>
            </Item>
            { passwordError ? (
              <Item>
                <Label>{passwordError}</Label>
              </Item>) : (<View/>) }
            <Item>
              <Label>Re-Password</Label>
              <Input onChangeText={(e) => this.setState({repassword: e})} value={this.state.repassword} secureTextEntry={true}/>
            </Item>
            <Label style={{color: 'red'}}>{this.state.message}</Label>
          </Form>
          <Button onPress={this.bindGuest.bind(this)}>
            <Icon name='md-save'/>
            <Text>Bind</Text>
          </Button>
        </Content>
        <Footer>
          <Button title="Logout" accessibilityLabel="Logout"
            onPress={() => this.props.authLogout(this.props.access_token)}>
            <Text>Logout</Text>
          </Button>
        </Footer>
      </Container>
    )
  }
}
