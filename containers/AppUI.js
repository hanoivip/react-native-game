import React from 'react'
import { View, Model, Image } from 'react-native'
import { connect } from 'react-redux'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { bindActionCreators } from 'redux'

import HomeScreen from '../screens/HomeScreen'
import LoginScreen from '../screens/LoginScreen'
import UserScreen from '../screens/UserScreen'
import RegisterScreen from '../screens/RegisterScreen'
import PurchaseScreen from '../screens/PurchaseScreen'
import { cookieLoad, COOKIE_AUTH_KEY} from '../actions/AuthApi'
import ArticleScreen from '../screens/ArticleScreen'
import LoadingContainer from '../containers/LoadingContainer'
import TopupScreen from '../screens/TopupScreen'
import RechargeScreen from '../screens/RechargeScreen'
import FlashMessage from "react-native-flash-message"
import HistoryScreen from '../screens/HistoryScreen'
import MessengerContainer from '../containers/MessengerContainer'

import { navigationRef } from '../RootNavigation'
import I18n from '../langs'

const mapStateToProps = state => ({
  logged_in: state.auth.logged_in,
})

function mapDispatchToProps(dispatch) {
    return {
        ...
        bindActionCreators({ cookieLoad }, dispatch)
    }
}

const Drawer = createDrawerNavigator()

class AppUI extends React.Component {
  componentDidMount()
  {
    this.props.cookieLoad(COOKIE_AUTH_KEY)
  }
  render() {
    if (this.props.logged_in)
    return (
        <NavigationContainer ref={navigationRef}>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} options={{ title: I18n.t('home') }} />
            <Drawer.Screen name="User" component={UserScreen} options={{ title: I18n.t('user') }} />
            <Drawer.Screen name="Purchase" component={PurchaseScreen} options={{ title: I18n.t('purchase') }} />
            <Drawer.Screen name="Article" component={ArticleScreen} options={{ title: I18n.t('article') }}/>
          </Drawer.Navigator>
          <LoadingContainer/>
          <FlashMessage position="bottom" />
          <MessengerContainer/>
        </NavigationContainer>
    )
    else
    return (
        <NavigationContainer ref={navigationRef}>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={HomeScreen} options={{ title: I18n.t('home') }} />
            <Drawer.Screen name="Login" component={LoginScreen} options={{ title: I18n.t('login') }} />
            <Drawer.Screen name="Register" component={RegisterScreen} options={{ title: I18n.t('register') }}/>
            <Drawer.Screen name="Article" component={ArticleScreen} options={{ title: I18n.t('article') }}/>
          </Drawer.Navigator>
          <LoadingContainer/>
          <FlashMessage position="bottom" />
          <MessengerContainer/>
        </NavigationContainer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppUI)
