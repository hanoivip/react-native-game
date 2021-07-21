import { connect } from 'react-redux'
import HistoryFragment from '../components/HistoryFragment'
import { loadRechargeHistory } from '../actions/GateApi'
import { bindActionCreators } from 'redux'

const mapStateToProps = state => ({
  access_token: state.auth.access_token,
  history: state.gate.history,
})

function mapDispatchToProps(dispatch) {
    return {
        ...
        bindActionCreators({ loadRechargeHistory }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryFragment)
