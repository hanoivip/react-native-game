import { FORGOT_URL, AppName } from '@env'
import React from 'react'
import { Switch, Linking, Image, View } from 'react-native'
import { Container, Content, Header, Left, Right, Body, Title, Text, Button, Card, CardItem, Input, Form, Item, Label, Footer, FooterTab, Icon, Stack } from 'native-base'
import { common } from '../styles/app.style'
import { showMessage } from "react-native-flash-message"
import I18n from '../langs'
import { styles } from '../styles/auth.style'

export default class LoginFragment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      remember: false,
    }
  }
  componentDidMount()
  {
    this.props.cookieLoadPw()
    .then(saved => {
      if (saved != null) {
        this.setState({username: saved.username, password: saved.password, remember: saved.remember})
      }
    })
  }
  login()
  {
    const username = this.state.username
    const password = this.state.password
    const remember = this.state.remember
    this.props.authLogin(username, password, remember)
    .then(result => {
      if (result == true) {
        showMessage({
          message: I18n.t('login'),
          description: I18n.t('loginSuccess'),
          type: "success",
        })
      }
      else {
        showMessage({
          message: I18n.t('login'),
          description: I18n.t('loginFailure'),
          type: "danger",
        })
      }
    })
  }
  quickPlay()
  {
    this.props.authGuest()
    .then(result => {
      if (result == true) {
        showMessage({
          message: I18n.t('login'),
          description: I18n.t('welcomeGuest'),
          type: "success",
        })
      }
      else {
        showMessage({
          message: I18n.t('login'),
          description: I18n.t('guestFailure'),
          type: "danger",
        })
      }
    })
  }
  register()
  {
    this.props.openRegister()
  }
  forgot()
  {
    //TODO: make app feature
    Linking.openURL(FORGOT_URL)
  }
  render()
  {
    const validators = this.props.validators
    const logo = this.props.logo
    let usernameError = ''
    let passwordError = ''
    if (validators != null) {
      if (validators.hasOwnProperty('username')) {
        usernameError = <Text style={common.validator}>{validators.username}</Text>
      }
      if (validators.hasOwnProperty('password')) {
        passwordError = <Text style={common.validator}>{validators.password}</Text>
      }
    }
    let logoTag = <Left/>
    if (logo != null)
    {
      logoTag = (
          <Left>
            <Image source={logo} style={{ width: 32, height: 32 }}/>
          </Left>)
    }
    return (
      <Container>
        <Header>
          {logoTag}
          <Body>
            <Title>Welcome to {AppName}</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={{paddingHorizontal: 10}}>
          <Form>
            <Item>
              <Label>Username</Label>
              <Input onChangeText={(val) => this.setState({username: val})} value={this.state.username}/>
            </Item>
            <Item>
              <Label>Password</Label>
              <Input onChangeText={(val) => this.setState({password: val})} value={this.state.password} secureTextEntry={true}/>
            </Item>
          </Form>
        </Content>
        <Content contentContainerStyle={{paddingHorizontal: 10, alignItems: 'center'}}>
          <Form>
            <Item>
              <Label>Remember</Label>
              <Switch value={this.state.remember} onValueChange={(val) => this.setState({remember: val})}/>
            </Item>
            <Button title="Login" accessibilityLabel="Login by username"
              onPress={this.login.bind(this)}>
              <Icon name='log-in'/>
              <Text>Login</Text>
            </Button>
            <Button title="Quick play" accessibilityLabel="Quick play"
              onPress={this.quickPlay.bind(this)}>
              <Icon name='md-play'/>
              <Text>Quick play</Text>
            </Button>
          </Form>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={this.register.bind(this)}>
              <Icon name='person-add'/>
              <Text>Register</Text>
            </Button>
            <Button onPress={this.forgot.bind(this)}>
              <Icon name='sync'/>
              <Text>Forgot password</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}
