import { connect } from 'react-redux'
import ArticleTabFragment from '../components/ArticleTabFragment'
import { loadArticleList, startLoading, endLoading } from '../actions/UiApi'
import { bindActionCreators } from 'redux';

const mapStateToProps = state => ({
  articles: state.ui.articles
})

function mapDispatchToProps(dispatch) {
    return {
        ...
        bindActionCreators({ loadArticleList, startLoading, endLoading }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleTabFragment)
