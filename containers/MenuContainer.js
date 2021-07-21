import { connect } from 'react-redux'
import DraggableMenuFragment from '../components/DraggableMenuFragment'
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
        bindActionCreators({  }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DraggableMenuFragment)
