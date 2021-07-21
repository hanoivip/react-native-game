import { connect } from 'react-redux'
import CardFragment from '../components/CardFragment'
import { bindActionCreators } from 'redux'
import { endTopup } from '../actions/GateApi'

const mapStateToProps = state => ({
  access_token: state.auth.access_token,
  config: state.gate.config,
  rule: state.gate.rule,
  route: state.gate.route,
})

function mapDispatchToProps(dispatch) {
    return {
        ...
        bindActionCreators({ endTopup }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardFragment)
