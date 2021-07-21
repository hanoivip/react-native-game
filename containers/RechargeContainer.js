import { connect } from 'react-redux'
import RechargeFragment from '../components/RechargeFragment'
import { bindActionCreators } from 'redux';
import { loadServers, loadCharacters } from '../actions/GameApi'
import { loadProducts, createOrder, payOrder, payCallback } from '../actions/PurchaseApi'
import { startLoading, endLoading } from '../actions/UiApi'

const mapStateToProps = state => ({
  access_token: state.auth.access_token,
  servers: state.game.servers,
  chars: state.game.chars,
  error: state.game.error,
  message: state.game.message,
  products: state.purchase.products,
})

function mapDispatchToProps(dispatch) {
    return {
        ...
        bindActionCreators({ loadServers, loadCharacters, loadProducts, startLoading, endLoading }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RechargeFragment)
