import * as React from 'react'
import { View, Dimensions, Text, Platform, DevSettings, TextInput } from 'react-native'
import { common, wrapper, header, main, footer } from '../styles/app.style'
import { showMessage } from 'react-native-flash-message'
import ServerList from './ServerList'
import RoleList from './RoleList'
import I18n from '../langs'
import { Container, Card, Icon, Picker, CardItem, Label, Content, Button, Input } from "native-base"

export default class GiftFragment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedSv: null,
      selectedRole: null,
      code: "",
      loading: false
    }
  }
  componentDidMount()
  {
    const servers = this.props.servers
    if (servers == null) this.loadServers()
  }
  loadServers()
  {
    this.props.loadServers(this.props.access_token)
  }
  loadCharacters()
  {
    this.props.loadCharacters(this.props.access_token, this.state.selectedSv)
  }
  onSelectServer(server) {
    if (server != this.state.selectedSv && server != undefined) {
      //console.log(server.name + ' ' + server.ident)
      if (!this.props.chars.hasOwnProperty(server))//server.name
        this.props.loadCharacters(this.props.access_token, server)//serer.name
      // use cache here, until manual refresh
    }
    this.setState({...this.state, selectedSv:server})
  }
  onSelectRole(role) {
    this.setState({selectedRole: role})
  }
  use()
  {
    const server=this.state.selectedSv
    const role=this.state.selectedRole
    const code=this.state.code
    this.setState({loading: true})
    this.props.useGift(this.props.access_token, server, role, code)
    .then(result => {
      this.setState({loading: false})
      if (result) {
        if (result.error == 0)
        {
          showMessage({
            message: I18n.t('gift'),
            description: I18n.t('giftOk'),
            type: "success",
          })
        }
        else {
          showMessage({
            message: I18n.t('gift'),
            description: result.message,
            type: "danger",
          })
        }
      }
      else {
        showMessage({
          message: I18n.t('gift'),
          description: I18n.t('giftNotOk'),
          type: "danger",
        })
      }
    })
  }
  render()
  {
    const selectedSv = this.state.selectedSv
    const selectedRole = this.state.selectedRole
    const loading = this.state.loading
    return (
      <Container style={{height: '100%'}}>
        <Content padder>
          <ServerList selected={selectedSv} data={this.props.servers}
            onSelectServer={(server) => this.onSelectServer(server)}
            reload={this.loadServers.bind(this)} />
          { selectedSv != null ? (
            <RoleList selected={selectedRole} data={this.props.chars}
              onSelectRole={this.onSelectRole.bind(this)}
              reload={this.loadCharacters.bind(this)}/>
          ) : (
            <View/>
          )}
          { selectedSv && selectedRole ? (
            <Card>
              <CardItem>
                <Label>Input Gift:</Label>
                <Input onChangeText={(val) => this.setState({code: val})}
                  value={this.state.code} style={{borderWidth: 1}}/>
              </CardItem>
              <CardItem>
                <Button isLoading={loading} isLoadingText="Sending.."
                  onPress={this.use.bind(this)}>
                  <Text>Use Code</Text>
                </Button>
              </CardItem>
            </Card>):(<View/>)}
        </Content>
      </Container>
    )
  }
}
