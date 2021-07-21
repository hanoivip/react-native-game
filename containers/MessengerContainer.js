import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Dimensions, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import Config from '../config'

const mapStateToProps = state => ({

})

function mapDispatchToProps(dispatch) {
    return {
        ...
        bindActionCreators({ }, dispatch)
    }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: windowWidth - 96,
    top: windowHeight - 96,
  }
});

function onMessenger()
{
  Linking.openURL(Config.Messenger)
}

export default class MessengerContainer extends React.Component
{
  render()
  {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={onMessenger}>
          <Image source={require('../assets/messenger.png')} style={{width: 64, height: 64, backgroundColor: 'transparent'}}/>
        </TouchableOpacity>
      </View>
    )
  }
}

//export default connect(mapStateToProps, mapDispatchToProps)(MessengerContainer)
