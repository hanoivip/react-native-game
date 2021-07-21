import React from 'react'
import PropTypes from 'prop-types'
import { Button, StyleSheet, Text, TextInput, View, Switch, Picker } from 'react-native'
import { Card, Icon, CardItem, Label } from "native-base"

export default function RoleList(props) {
  var roles = []
  const data = props.data
  if (Object.keys(data).length > 0) {
    roles.push(<Picker.Item key={0} value={null} label="Please choose a character" />)
    Object.keys(data).map(function (roleId) {
      roles.push(<Picker.Item key={roleId} value={roleId} label={data[roleId]} />)
    })
    return (
      <Card>
        <CardItem>
          <Picker selectedValue={props.selected} style={{ width: '100%' }}
          onValueChange={(itemValue, itemIndex) => props.onSelectRole(itemValue)}>
            {roles}
          </Picker>
        </CardItem>
      </Card>
    )
  }
  else {
    return (
      <Card>
        <CardItem>
          <Label>You still have no characters yet!</Label>
        </CardItem>
        <CardItem>
          <Button onPress={() => props.reload()} title="Reload" />
        </CardItem>
      </Card>)
  }
}
