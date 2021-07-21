import { connect } from 'react-redux'
import DownloadFragment from '../components/DownloadFragment'
import { bindActionCreators } from 'redux'
import { loadReleaseMeta, loadDownloadedMeta } from '../actions/UiApi'

const mapStateToProps = state => ({
  lastest: state.ui.lastest,
})

function mapDispatchToProps(dispatch) {
    return {
        ...
        bindActionCreators({ loadReleaseMeta, loadDownloadedMeta }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DownloadFragment)
