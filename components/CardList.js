import React from 'react'
import PropTypes from 'prop-types'
import { Button, Image, Text, View, Picker } from 'react-native'
import { common } from '../styles/app.style'
import { showMessage } from "react-native-flash-message"
import { CDN_URL } from '@env'
import I18n from '../langs'
import { Container, Card, Icon, CardItem, Label, List, ListItem, Left, Right, Body } from "native-base"

function choose(enabled, type, detail, amount, callback)
{
  if (!enabled.includes(type) || !detail.available) {
    showMessage({
      message: I18n.t('topup'),
      description: I18n.t('topupBusy'),
      type: "danger",
    })
    return
  }
  if (amount == undefined || amount <= 0) {
    showMessage({
      message: I18n.t('topup'),
      description: I18n.t('topupSelectAmount'),
      type: "danger",
    })
    return
  }
  // forward back to parent
  callback(type, amount)
}

export default function CardList(props) {
  const [selectedAmount, setSelectedAmount] = React.useState(0);
  var cards = []
  const data = props.data
  //console.log('CardLIst......' + JSON.stringify(data))
  if (data != null) {
    const cardtypes = data.cardtypes
    const cutoffs = data.cutoffs
    const enabled = data.enabled
    const onSelect = props.onSelect
    for (let [type, detail] of Object.entries(cardtypes)) {
      var supportedValues = []
      if (detail.need_dvalue) {
        //console.log(JSON.stringify(detail.supported_values))
        supportedValues.push(<Picker.Item key={0} value={0} label={ I18n.t('topupChooseAmount') } />)
        for (let [dvalue, dvalueTitle] of Object.entries(detail.supported_values)) {
          supportedValues.push(<Picker.Item key={dvalue} value={dvalue} label={dvalueTitle} />)
        }
      }
      const cardImg = CDN_URL + '/img/' + type + '.png'
      cards.push(
        <ListItem key={type}>
          <Left>
            { enabled.includes(type) && detail.available ? (
              <Image source={{uri: cardImg }} style={{ width: 256, height: 114 }}/>) : (
                <Image source={{uri: cardImg }} style={{ width: 256, height: 114, opacity: 0.2 }}/>
              )}
          </Left>
          <Body>
            <Text>{detail.title}</Text>
            { detail.need_dvalue ? (<Picker selectedValue={selectedAmount} style={{width: '100%'}}
              onValueChange={(itemValue, itemIndex) => setSelectedAmount(itemValue)}
              style={{width: '70%', height:30}}>
                {supportedValues}
              </Picker>) : (<View/>)}
          </Body>
          <Right>
          <Button
            onPress={() => choose(enabled, type, detail, selectedAmount, onSelect)}
            title={ I18n.t('commonNext')}/>
          </Right>
        </ListItem>
      )
    }
  }
  else {
    return (
      <Container>
        <Label>{I18n.t('topupMaintainance')}</Label>
      </Container>
    )
  }
  return (
    <Container style={{height: '100%'}}>
      <List>
        {cards}
      </List>
    </Container>
  )
}
