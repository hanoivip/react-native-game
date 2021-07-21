import React from 'react'
import PropTypes from 'prop-types'
import { Button, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import { CDN_URL } from '@env'
import { wrapper, header, main, footer } from '../styles/app.style'
import { Content, Icon, Label, List, ListItem, Right, Left, Body, Card, CardItem } from "native-base"

export default function ProductList(props) {
  var products = []
  const data = props.data
  //console.log(data)
  if (data != undefined && data.length > 0) {
    data.map((key, index) => {
      products.push(
          <ListItem key={index} thumbnail>
            <Left>
              <Image source={{ uri: CDN_URL + data[index].merchant_image }}
                style={main.productImage}/>
            </Left>
            <Body>
              <Label style={{fontSize: 18}}>{data[index].merchant_title}</Label>
              <Text style={{fontSize: 18}}>Price:{data[index].price} {data[index].currency}</Text>
            </Body>
            <Right>
              <Button onPress={() => props.onPurchase(data[index])} title="Buy"/>
            </Right>
          </ListItem>)
    })
    return (
      <List>
        {products}
      </List>
    )
  }
  else {
    return (
      <Card>
        <CardItem>
          <Label>Shop is empty now! Please come back later!</Label>
        </CardItem>
        <CardItem>
          <Button onPress={() => props.reload()} title="Reload" />
        </CardItem>
      </Card>)
  }
}
