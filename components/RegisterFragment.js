import React from 'react'
import PropTypes from 'prop-types'
import { Container, Content, Header, Left, Right, Body, Title, Text, Button, Card, CardItem, Input, Form, Item, Label, Footer, FooterTab, Icon } from 'native-base'
import { Switch, Linking, View } from 'react-native'
import { common } from '../styles/app.style'
import { showMessage } from 'react-native-flash-message'
import I18n from '../i18n/i18n'

export default class RegisterFragment extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = {
      message: '',
      username: '',
      password: '',
      repassword: '',
    }
  }
  register()
  {
    const username = this.state.username
    const password = this.state.password
    const repassword = this.state.repassword
    this.setState({message: ''})
    if (username == '' || password == '' || repassword == '') {
      this.setState({message: I18n.t('registerEmptyInput')})
      return
    }
    if (password != repassword) {
      this.setState({message: I18n.t('registerPassNotMatch')})
      return
    }
    this.props.authRegister(username, password)
    .then(result => {
      if (result == true) {
        showMessage({
          message: I18n.t('register'),
          description: I18n.t('registerSuccess'),
          type: "success",
        })
      }
      else {
        showMessage({
          message: I18n.t('register'),
          description: I18n.t('registerFailure'),
          type: "danger",
        })
      }
    })
  }
  render() {
    const validators = this.props.validators
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
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Register new account</Title>
          </Body>
        </Header>
        <Content contentContainerStyle ={{paddingHorizontal: 10}}>
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
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={this.register.bind(this)}>
              <Icon name='play'/>
              <Text>OK</Text>
            </Button>
            <Button onPress={() => this.props.back()}>
              <Text>Cancel</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
