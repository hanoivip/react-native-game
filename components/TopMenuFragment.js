import React from 'react'
import { TouchableOpacity, View, Image, Button } from 'react-native';
import { wrapper, header, main, footer } from '../styles/app.style'

export default function TopMenuFragment(props) {
  return (
    <View style={header.topHeader}>
        <TouchableOpacity onPress={props.toggleMenu} style={{flex: 1}}>
          <Image style={header.btnMenu} source={require('../assets/menu.png')}/>
        </TouchableOpacity>
    </View>
  )
}
