import { API_URL } from '@env'
import { LOADING_START, LOADING_END } from './Type'
import { BANNER_LOADED, BANNER_LOADED_FAIL } from './Type'
import { LISTARTICLE_LOADED, LISTARTICLE_LOADED_FAIL } from './Type'
import { ARTICLE_LOADED, ARTICLE_LOADED_FAIL } from './Type'
import { RELEASE_META_LOADED, RELEASE_META_LOADED_FAIL } from './Type'

export const startLoading = () => ({ type: LOADING_START })
export const endLoading = () => ({ type: LOADING_END })

export function loadBanner()
{
  return (dispatch) => {
    dispatch(startLoading())
    return fetch(API_URL + '/api/test_banner_success')
    .then(response => {
      // console.log(response)
      dispatch(endLoading())
      if (response.status != 200) {
        dispatch(bannerLoadedFail())
      }
      else {
        return response.json()
      }
    })
    .then(json => {
      if (json.error == 0) {
        dispatch(bannerLoaded(json.data))
      }
      else {
        dispatch(bannerLoadedFail())
      }
    })
    .catch(error => {
      dispatch(endLoading())
      dispatch(bannerLoadedFail())
    })
  }
}


export const bannerLoaded = (data) => ({ type: BANNER_LOADED, data })
export const bannerLoadedFail = () => ({ type: BANNER_LOADED_FAIL })

export function loadArticleList()
{
  return (dispatch) => {
    dispatch(startLoading())
    return fetch(API_URL + '/api/test_articlelist_success')
    .then(response => {
      dispatch(endLoading())
      if (response.status != 200) {
        dispatch(articleListLoadedFail())
      }
      else {
        return response.json()
      }
    })
    .then(json => {
      if (json.error == 0) {
        dispatch(articleListLoaded(json.data))
      }
      else {
        dispatch(articleListLoadedFail())
      }
    })
    .catch(error => {
      dispatch(endLoading())
      dispatch(articleListLoadedFail())
    })
  }
}
export const articleListLoaded = (data) => ({ type: LISTARTICLE_LOADED, data })
export const articleListLoadedFail = () => ({ type: LISTARTICLE_LOADED_FAIL })

export function loadArticle(id)
{
  return (dispatch) => {
    dispatch(startLoading())
    return fetch(API_URL + '/api/test_article_success?id=' + id)
    .then(response => {
      dispatch(endLoading())
      if (response.status != 200) {
        dispatch(articleLoadedFail())
      }
      else {
        return response.json()
      }
    })
    .then(json => {
      if (json.error == 0) {
        dispatch(articleLoaded(json.data))
      }
      else {
        dispatch(articleLoadedFail())
      }
    })
    .catch(error => {
      dispatch(endLoading())
      dispatch(articleLoadedFail())
    })
  }
}
export const articleLoaded = (data) => ({ type: ARTICLE_LOADED, data })
export const articleLoadedFail = () => ({ type: ARTICLE_LOADED_FAIL })

export function loadReleaseMeta()
{
  return (dispatch) => {
    dispatch(startLoading())
    return fetch(API_URL + '/api/version/lastest')
    .then(response => {
      dispatch(endLoading())
      if (response.status != 200) {
        dispatch(releaseMetaFail())
      }
      else {
        return response.json()
      }
    })
    .then(json => {
      if (json.error == 0) {
        dispatch(releaseMetaSuccess(json.data))
      }
      else {
        dispatch(releaseMetaFail())
      }
    })
    .catch(error => {
      dispatch(endLoading())
      dispatch(releaseMetaFail())
    })
  }
}
const releaseMetaSuccess = (data) => ({ type: RELEASE_META_LOADED, data })
const releaseMetaFail = () => ({ type: RELEASE_META_LOADED_FAIL })

export function loadDownloadedMeta()
{

}

export function saveDownloadedMeta(lastestInfo)
{

}
