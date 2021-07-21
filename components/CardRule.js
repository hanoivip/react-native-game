import React from 'react'
import { ScrollView, Text, Dimensions } from 'react-native'
import { common } from '../styles/app.style'
import { WebView } from 'react-native-webview'

export default function CardRule(props) {
  return (
    <ScrollView style={{ flex: 1 }}>
      <Text>Quy tắc nạp:</Text>
      <WebView originWhitelist={['*']}  source={{ html: props.data }} style={{}}/>
    </ScrollView>)
}
