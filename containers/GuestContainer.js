import { connect } from 'react-redux'
import GuestFragment from '../components/GuestFragment'
import { bindActionCreators } from 'redux'
import { bindGuest, authLogout } from '../actions/AuthApi'

const mapStateToProps = state => ({
  access_token: state.auth.access_token,
  error: state.auth.error,
  message: state.auth.message,
})

function mapDispatchToProps(dispatch) {
    return {
        ...
        bindActionCreators({ bindGuest, authLogout }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestFragment)
