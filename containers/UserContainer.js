import { connect } from 'react-redux'
import UserFragment from '../components/UserFragment'
import { authGetInfo, authLogout } from '../actions/AuthApi'
import { loadBalanceInfo } from '../actions/GateApi'
import { bindActionCreators } from 'redux'

const mapStateToProps = state => ({
  access_token: state.auth.access_token,
  user_info: state.auth.user_info,
  error: state.auth.error,
  message: state.auth.message,
  balance_info: state.gate.user_info,
})

function mapDispatchToProps(dispatch) {
    return {
        ...
        bindActionCreators({ authGetInfo, authLogout, loadBalanceInfo }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFragment)
