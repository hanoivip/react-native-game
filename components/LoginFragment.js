import { FORGOT_URL, CDN_URL, AppName } from '@env'
import React from 'react'
import { Switch, Linking, Image, View } from 'react-native'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  Divider
} from 'native-base'
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
    let usernameError = <View/>
    let passwordError = <View/>
    if (validators != null) {
      if (validators.hasOwnProperty('username')) {
        usernameError = <Text style={common.validator}>{validators.username}</Text>
      }
      if (validators.hasOwnProperty('password')) {
        passwordError = <Text style={common.validator}>{validators.password}</Text>
      }
    }
    let logoTag = (<Image source={{uri: CDN_URL + '/img/logo.png'}} style={{ width: 32, height: 32 }}/>)
    return (
      <Box safeArea flex={1} p={2} w="90%" mx='auto'>
        <Heading>
          {logoTag}
          <Text>Welcome to {AppName}</Text>
        </Heading>
        <VStack space={2} mt={5}>
          <FormControl>
            <FormControl.Label _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
              Username
            </FormControl.Label>
            <Input onChangeText={(val) => this.setState({username: val})} value={this.state.username}/>
            <FormControl.Label _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
              Password
            </FormControl.Label>
            <Input onChangeText={(val) => this.setState({password: val})} value={this.state.password} secureTextEntry={true}/>
          </FormControl>
        </VStack>
        <VStack space={2} mt={5}>
          <Button colorScheme="cyan" _text={{color: 'white' }} onPress={this.login.bind(this)}>
              Login
          </Button>
          <Button colorScheme="cyan" _text={{color: 'white' }} onPress={this.quickPlay.bind(this)}>
              Quick play
          </Button>
          <HStack justifyContent="center">
            <Text fontSize='sm' color='muted.700' fontWeight={400}>I'm a new user. </Text>
            <Link _text={{ color: 'cyan.500', bold: true, fontSize: 'sm' }} href="#" onPress={this.register.bind(this)}>
              Sign Up
            </Link>
          </HStack>
          <HStack justifyContent="center">
            <Text fontSize='sm' color='muted.700' fontWeight={400}>I forgot pass </Text>
            <Link _text={{ color: 'cyan.500', bold: true, fontSize: 'sm' }} href="#" onPress={this.forgot.bind(this)}>
              Recover
            </Link>
          </HStack>
        </VStack>
      </Box>
    )
  }
}
