import { LOADING_START, LOADING_END } from '../actions/Type'
import { BANNER_LOADED, BANNER_LOADED_FAIL } from '../actions/Type'
import { LISTARTICLE_LOADED, ARTICLE_LOADED } from '../actions/Type'

const initialState = {
  banners: [ { title: '', src: "", article: '' } ],
  articles: null,
  langs: null,
  loading: false,
  lastest: null,      // lastest version info
  downloaded: null,   // downloaded version info
  downloading: null,  //downloading version info
}

export default function ui(state = initialState, action)
{
  switch (action.type)
  {
    case BANNER_LOADED:
    return Object.assign({}, state, {
      banners: action.data
    })
    case LOADING_START:
    return Object.assign({}, state, {
      loading: true
    })
    case LOADING_END:
    return Object.assign({}, state, {
      loading: false
    })
    case LISTARTICLE_LOADED:
    return Object.assign({}, state, {
      articles: action.data
    })
    default:
      return state
  }
}
