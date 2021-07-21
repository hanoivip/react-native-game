import { connect } from 'react-redux'
import RegisterFragment from '../components/RegisterFragment'
import { authRegister } from '../actions/AuthApi'
import { bindActionCreators } from 'redux';

const mapStateToProps = state => ({
  logged_in: state.auth.logged_in,
  error: state.auth.error,
  message: state.auth.message,
  validators: state.auth.validators,  
})

function mapDispatchToProps(dispatch) {
    return {
        ...
        bindActionCreators({ authRegister }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterFragment)
