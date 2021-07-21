import React from 'react'
import { Button, Image, Text, View, Platform } from 'react-native'
import Draggable from 'react-native-draggable'
import { styles } from '../styles/auth.style'
import I18n from '../langs'

export default class DraggableMenuFragment extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      fired: false,
    }
  }
  componentDidMount()
  {
  }
  render()
  {
    return (
      <View style={styles.screen}>
        <Draggable x={75} y={100} z={1} renderSize={56} renderColor='black'
        renderText='A' isCircle shouldReverse onShortPressRelease={()=>alert('touched!!')}/>
      </View>
    )
  }
}
