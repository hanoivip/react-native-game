import React from 'react'
import PropTypes from 'prop-types'
import {
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
import { View } from 'react-native'
import I18n from '../langs'
import { showMessage } from 'react-native-flash-message'
import { common } from '../styles/app.style'

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
    return (
      <Box safeArea flex={1} p={2} w="90%" mx='auto'>
        <Heading>
          <Text>You should bind your account, now!</Text>
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
        <VStack space={2}>
          <Button onPress={this.bindGuest.bind(this)}>
            Bind
          </Button>
          <Button title="Logout" accessibilityLabel="Logout"
            onPress={() => this.props.authLogout(this.props.access_token)}>
            Logout</Button>
        </VStack>
      </Box>
    )
  }
}
