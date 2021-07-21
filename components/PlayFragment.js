import React from 'react'
import { Button, Image, Text, View, Platform, Linking, TouchableOpacity, ImageBackground } from 'react-native'
import { styles } from '../styles/auth.style'
import I18n from '../langs'
import { showMessage } from 'react-native-flash-message'

export default class PlayFragment extends React.Component
{
  constructor(props) {
    super(props)
    this.state = {
      fired: false,
    }
  }
  async componentDidMount()
  {
    let startOnReady = true
    if (this.props.hasOwnProperty('startOnReady'))
      startOnReady = this.props.startOnReady
    //console.log("start on ready: " + startOnReady)
    if (!this.state.fired && startOnReady==true)
    {
      this.startGame()
      this.setState({fired: true})
    }
  }
  startGame()
  {
    let clientCheckUpdate = false
    if (this.props.hasOwnProperty('clientCheckUpdate'))
      clientCheckUpdate = this.props.clientCheckUpdate
    if (clientCheckUpdate)
    {
      //this.props.checkUpdate(this.props.access_token).then(result => {
      this.props.canEnterGame(this.props.access_token).then(result => {
        if (result == true)
        {
          // not need to update, trigger game
          this.props.onStartGame(this.props.access_token, this.props.app_user_id)
        }
        else {
          // have to update, show message & open link
          showMessage({
            message: I18n.t('update'),
            description: I18n.t('update_must'),
            type: "danger",
          })
          Linking.openURL(result.update_url)
        }
      })
    }
    else {
      // trigger game login
      this.props.onStartGame(this.props.access_token, this.props.app_user_id)
    }
  }
  render()
  {
    const background=this.props.background
    const startBtn=this.props.startBtn
    let startOnReady = true
    if (this.props.hasOwnProperty('startOnReady'))
      startOnReady = this.props.startOnReady;
    let control = null
    if (this.state.fired || startOnReady==false) {
      if (startBtn != null)
      {
      control = (
        <TouchableOpacity onPress={this.startGame.bind(this)}>
          <Image style={{width: 260, height: 145}} source={startBtn}/>
        </TouchableOpacity>)
      }
      else {
        control = (<Button onPress={() => this.startGame()} title="Start game" />)
      }
    }
    else {
      control = (<Image source={require('../assets/loading.gif')} style={{width: 64, height: 64}}/>)
    }
    return (
      <View style={{flex: 1}}>
        <ImageBackground source={background} style={{width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'center'}}>
          <View style={{flex: 1}}>
            
          </View>
          <View style={{flex: 5, justifyContent: 'flex-end'}}>
            <Text style={{fontSize: 20, color: 'white'}}>{I18n.t('playing')}</Text>
            { control }
          </View>
        </ImageBackground>
      </View>
    )
  }
}
