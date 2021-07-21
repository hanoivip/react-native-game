import { connect } from 'react-redux'
import LoginFragment from '../components/LoginFragment'
import { authLogin, cookieLoadPw, authGuest } from '../actions/AuthApi'
import { bindActionCreators } from 'redux'

const mapStateToProps = state => ({
  logged_in: state.auth.logged_in,
  error: state.auth.error,
  message: state.auth.message,
  validators: state.auth.validators,
})

function mapDispatchToProps(dispatch) {
    return {
        ...
        bindActionCreators({ authLogin, cookieLoadPw, authGuest }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginFragment)
