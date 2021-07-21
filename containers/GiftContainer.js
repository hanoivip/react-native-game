import { connect } from 'react-redux'
import GiftFragment from '../components/GiftFragment'
import { loadServers, loadCharacters, useGift } from '../actions/GameApi'
import { bindActionCreators } from 'redux'

const mapStateToProps = state => ({
  access_token: state.auth.access_token,
  servers: state.game.servers,
  chars: state.game.chars,
})

function mapDispatchToProps(dispatch) {
    return {
        ...
        bindActionCreators({ loadServers, loadCharacters, useGift }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftFragment)
