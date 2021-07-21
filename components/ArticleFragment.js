import React from 'react'
import { View, ScrollView, Linking, StyleSheet, Image } from 'react-native'
import HTMLView from 'react-native-htmlview'


function renderNode(node, index, siblings, parent, defaultRenderer) {
  // console.log(node.name)
  if (node.name == 'img') {
    console.log(node.attribs.src)
    return <Image source={{uri: node.attribs.src}}
    style={{flex: 1, width: undefined, height: undefined}} resizeMode='stretch'/>
  }
  if (node.name=='figure') {
    return (
      <View style={{flex:1, height: 600}}>
      {defaultRenderer(node.children, parent)}
      </View>
    )
  }
}

export default function ArticleFragment(props) {
  return (
    <ScrollView style={{ flex: 1 }}>
      <HTMLView value={props.contents.value}
        onLinkPress={(url) => Linking.openURL(url)}
        renderNode={renderNode} />
    </ScrollView>
  )
}
