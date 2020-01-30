import {createStore, applyMiddleware} from 'redux'
import reducer from './Reducers/index'
import thunk from 'redux-thunk'

export default createStore(reducer, applyMiddleware(thunk))