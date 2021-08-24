import { FORGOT_URL, CDN_URL, AppName } from '@env'
import React from 'react'
import PropTypes from 'prop-types'
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
import { Switch, Linking, View, Image } from 'react-native'
import { common } from '../styles/app.style'
import { showMessage } from 'react-native-flash-message'
import I18n from '../langs'

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
    const logo = this.props.logo
    let usernameError = <View/>
    let passwordError = <View/>
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
    let logoTag = (<Image source={{uri: CDN_URL + '/img/logo.png'}} style={{ width: 32, height: 32 }}/>)
    return (
      <Box safeArea flex={1} p={2} w="90%" mx='auto'>
        <Heading>
          {logoTag}
          <Text>Register new account</Text>
        </Heading>
        <VStack space={2} mt={5}>
          <FormControl>
            <FormControl.Label _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
              Username
            </FormControl.Label>
            <Input onChangeText={(val) => this.setState({username: val})} value={this.state.username}/>
            { usernameError }
            <FormControl.Label _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
              Password
            </FormControl.Label>
            <Input onChangeText={(val) => this.setState({password: val})} value={this.state.password} secureTextEntry={true}/>
            { passwordError }
            <FormControl.Label _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
              Re-Password
            </FormControl.Label>
            <Input onChangeText={(e) => this.setState({repassword: e})} value={this.state.repassword} secureTextEntry={true}/>
            <Text style={{color: 'red'}}>{this.state.message}</Text>
          </FormControl>
        </VStack>
        <HStack space={2}  mt={5}>
          <Button colorScheme="cyan" _text={{color: 'white' }} onPress={this.register.bind(this)} >
              SignUp
          </Button>
          <Button colorScheme="cyan" _text={{color: 'white' }} onPress={() => this.props.back()} >
              Cancel
          </Button>
        </HStack>
      </Box>
    )
  }
}
