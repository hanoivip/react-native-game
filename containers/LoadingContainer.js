import React from 'react';
import { connect } from 'react-redux'
import { startLoading, endLoading } from '../actions/UiApi'
import { bindActionCreators } from 'redux';
import { View, Dimensions, Image, StyleSheet } from 'react-native'
import { Container, Header, Content, Spinner } from 'native-base'

const mapStateToProps = state => ({
  loading: state.ui.loading
})

function mapDispatchToProps(dispatch) {
    return {
        ...
        bindActionCreators({ startLoading, endLoading }, dispatch)
    }
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
    width: windowWidth,
    height: windowHeight,
    zIndex: 999
  }
});

class LoadingContainer extends React.Component
{
  render()
  {
    if (this.props.loading)
    return (
      <Container style={styles.container} transparent>
        <Spinner/>
      </Container>
    )
    else {
      return <View/>
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadingContainer)
