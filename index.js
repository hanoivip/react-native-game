import * as React from 'react'
import { createStore, applyMiddleware } from 'redux'
import homeApp from './reducers'
import thunk from 'redux-thunk'

const store = createStore(homeApp, applyMiddleware(thunk))
const navigationRef = React.createRef()

function navigate(name, params) {
  navigationRef.current?.navigate(name, params)
}

export default { store, navigationRef, navigate }
