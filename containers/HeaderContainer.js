import { connect } from 'react-redux'
import { Platform } from 'react-native'
import HeaderFragment from '../components/HeaderFragment'
import { bindActionCreators } from 'redux'
import { loadDownloadConfig } from '../actions/DownloadApi'

const mapStateToProps = state => ({
  logged_in: state.auth.logged_in,
  access_token: state.auth.access_token,
  app_user_id: state.auth.app_user_id,
})

function mapDispatchToProps(dispatch) {
    return {
        ...
        bindActionCreators({ loadDownloadConfig }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderFragment)
