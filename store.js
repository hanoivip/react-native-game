import { createStore, applyMiddleware } from 'redux'
import homeApp from './reducers'
import thunk from 'redux-thunk'

const store = createStore(homeApp, applyMiddleware(thunk))
export { store }
