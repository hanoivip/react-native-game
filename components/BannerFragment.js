import React from 'react'
import { StyleSheet, Text, View, Image, Platform } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import slideStyles, { sliderWidth, itemWidth, sliderHeight } from '../styles/SlideEntry.style'
import styles, { colors } from '../styles/index.style'
import { wrapper, header, main, footer } from '../styles/app.style'

export default class BannerFragment extends React.Component {
  _carousel = null

  componentDidMount()
  {
    this.props.loadBanner()
  }

  _renderItem ({item, index}) {
    //console.log(item.src)
    if (item.src=="")
      return (<Image source={require('../assets/cover0.png')} style={{height: sliderHeight}} />)
    else
      return (<Image source={{uri: item.src}} style={{height: sliderHeight}} />)
  }

  render()
  {
    const banners = this.props.banners
    return (
      <View style={header.banner}>
        <Carousel
          ref={(c) => { this._carousel = c }}
          data={banners}
          renderItem={this._renderItem.bind(this)}
          sliderWidth={sliderWidth}
          sliderHeight={sliderHeight}
          itemWidth={sliderWidth}
          itemHeight={sliderHeight}
          autoplay
          loop={true}/>
        </View>
     )
  }
}
