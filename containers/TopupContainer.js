import { connect } from 'react-redux'
import TopupFragment from '../components/TopupFragment'
import { bindActionCreators } from 'redux'
import { loadGateConfig, loadGateRule, beginTopup, endTopup } from '../actions/GateApi'

const mapStateToProps = state => ({
  access_token: state.auth.access_token,
  config: state.gate.config,
  rule: state.gate.rule,
})

function mapDispatchToProps(dispatch) {
    return {
        ...
        bindActionCreators({ loadGateConfig, loadGateRule, beginTopup, endTopup }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopupFragment)
