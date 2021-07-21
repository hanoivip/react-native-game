import React from 'react';
import { Button, TouchableOpacity, Text, View, Image, Platform, Linking  } from 'react-native';
import { CardPayment, PaypalPayment, DownloadGuide } from '@env'
import { wrapper, header, main, footer } from '../styles/app.style'
import { LinearGradient } from 'expo-linear-gradient'
import { showMessage } from "react-native-flash-message"
import * as RootNavigation from '../RootNavigation.js'

import I18n from '../langs'
import store from '../configureStore'

export default class HeaderFragment extends React.Component {

  async purchase()
  {
    if (!this.props.logged_in) {
      showMessage({
        message: "Stop",
        description: I18n.t('loginRequired'),
        type: "danger",
      })
      //TODO: move to middleware???
      return RootNavigation.navigate("Login")
    }
    else {
      await this.platformPurchase()
    }
  }
  platformPurchase()
  {
    if (CardPayment || PaypalPayment) {
      return RootNavigation.navigate("Topup")
    }
    else {
      return Platform.select({
        android: RootNavigation.navigate("Purchase"),
        ios: RootNavigation.navigate("Purchase"),
        default: RootNavigation.navigate("Topup")
      })
    }
  }
  getArticleGuide()
  {
    const targetId = DownloadGuide
    const articles = store.getState().ui.articles
    let xxx = null
    if (articles != null) {
      Object.values(articles.guides.data).map(article => {
        let ret = targetId.localeCompare(article.url, "en")
        if (ret == 0) {
          xxx = article
          // return here fail??
        }
      })
    }
    return xxx
  }
  installIos()
  {
    Linking.openURL(CDN_URL + '/download/ios/inhouse')
  }
  async installApk()
  {
    let result = this.getArticleGuide()
    if (result != null) {
      return RootNavigation.navigate('Article', {'article': result.entry})
    }
    let config = await this.props.loadDownloadConfig(this.props.access_token)
    console.log(config)
    Linking.openURL(config.urls.android_apk)
    //Linking.openURL(Config.SITE_URL + '/download/android/apk')
    //Linking.openURL(Config.SITE_URL)
  }
  render()
  {
    let downloadBtn = Platform.select({
      ios: (
        <TouchableOpacity onPress={this.installIos.bind(this)}>
          <Image style={{width: 100, height: 35}} source={require('../assets/bt-ios.png')}/>
        </TouchableOpacity>),
      default: (
        <TouchableOpacity onPress={this.installApk.bind(this)}>
          <Image style={{width: 100, height: 35}} source={require('../assets/bt-android.png')}/>
        </TouchableOpacity>)
    });
    let payBtn = Platform.select({
      android: (
        <TouchableOpacity onPress={this.purchase.bind(this)}>
          <Image style={{width: 100, height: 35}} source={require('../assets/gpay.jpg')}/>
        </TouchableOpacity>),
      ios: (
          <TouchableOpacity onPress={this.purchase.bind(this)}>
            <Image style={{width: 100, height: 35}} source={require('../assets/apay.png')}/>
          </TouchableOpacity>),
      default: (
        <TouchableOpacity onPress={this.purchase.bind(this)}>
          <Image style={{width: 100, height: 35}} source={require('../assets/napthe.jpg')}/>
        </TouchableOpacity>),
    })
    if (CardPayment != undefined && CardPayment) {
      payBtn = (
        <TouchableOpacity onPress={this.purchase.bind(this)}>
          <Image style={{width: 100, height: 35}} source={require('../assets/napthe.jpg')}/>
        </TouchableOpacity>)
    }
    if (PaypalPayment != undefined && PaypalPayment) {
      payBtn = (
        <TouchableOpacity onPress={this.purchase.bind(this)}>
          <Image style={{width: 100, height: 35}} source={require('../assets/paypal.png')}/>
        </TouchableOpacity>)
    }
    return (
      <LinearGradient colors={['#00a9e2','#061a40']} style={header.header}>
        <Image source={require('../assets/icon.png')} style={header.appIcon} />
        <View style={header.appInfo}>
          <Text style={{color: 'white', fontSize: 18, paddingLeft: 2, paddingRight: 3}}>
            App Name Here
            <Image source={require('../assets/verified.png')} style={{width: 20, height: 20}} />
          </Text>
          <Text style={{color: 'white', fontSize: 14, paddingLeft: 2, paddingRight: 3}}>Publisher: Game OH</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 30}}>
            {payBtn}
            {downloadBtn}
          </View>
        </View>
      </LinearGradient>
    )
  }
}
