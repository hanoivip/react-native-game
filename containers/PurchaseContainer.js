import { connect } from 'react-redux'
import PurchaseFragment from '../components/PurchaseFragment'
import { loadServers, loadCharacters } from '../actions/GameApi'
import { loadProducts, createOrder, payInit, payOrder, payCallback } from '../actions/PurchaseApi'
import { bindActionCreators } from 'redux';

const mapStateToProps = state => ({
  access_token: state.auth.access_token,
  servers: state.game.servers,
  chars: state.game.chars,
  error: state.game.error,
  message: state.game.message,
  products: state.purchase.products,
  order: state.purchase.order,
  paid: state.purchase.paid,
  need_callback: state.purchase.need_callback,
  receipt: state.purchase.receipt,
  fail_count: state.purchase.fail_count,
})

function mapDispatchToProps(dispatch) {
    return {
        ...
        bindActionCreators({ loadServers, loadCharacters, loadProducts,
          payInit, createOrder, payOrder, payCallback }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchaseFragment)
