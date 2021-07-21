import { connect } from 'react-redux'
import PlayFragment from '../components/PlayFragment'
import { bindActionCreators } from 'redux'
import { loadDownloadConfig, checkUpdate, canEnterGame } from '../actions/DownloadApi'

const mapStateToProps = state => ({
  logged_in: state.auth.logged_in,
  app_user_id: state.auth.app_user_id,
  access_token: state.auth.access_token,
})

function mapDispatchToProps(dispatch) {
    return {
        ...
        bindActionCreators({ loadDownloadConfig, checkUpdate, canEnterGame }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayFragment)
