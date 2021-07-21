import React from 'react'
import PropTypes from 'prop-types'
import { Button, StyleSheet, Text, TextInput, View, Switch, Picker } from 'react-native'
import { Card, Icon, CardItem, Label } from "native-base"


export default function ServerList(props) {
  var servers = []
  const data = props.data
  if (data != undefined && data.length > 0) {
    servers.push(<Picker.Item key="-1" value={undefined} label="Please choose a server"/>)
    data.map((key, index) => {
      //TODO: value=data[index] can not be read
      servers.push(<Picker.Item key={index} value={data[index].name} label={data[index].title} />)
    })
    return (
      <Card>
        <CardItem>
          <Picker selectedValue={props.selected} style={{ width: '100%' }} value={props.selected}
          onValueChange={(itemValue, itemIndex) => props.onSelectServer(itemValue)}>
            {servers}
          </Picker>
        </CardItem>
      </Card>
    )
  }
  else {
    return (
      <Card>
        <CardItem>
          <Label>There is no server yet! Please come back later!</Label>
        </CardItem>
        <CardItem>
          <Button onPress={() => props.reload()} title="Reload" />
        </CardItem>
      </Card>)
  }
}
