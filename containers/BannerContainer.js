import { connect } from 'react-redux'
import BannerFragment from '../components/BannerFragment'
import { loadBanner, startLoading, endLoading } from '../actions/UiApi'
import { bindActionCreators } from 'redux';

const mapStateToProps = state => ({
  banners: state.ui.banners
})

function mapDispatchToProps(dispatch) {
    return {
        ...
        bindActionCreators({ loadBanner, startLoading, endLoading }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BannerFragment)
