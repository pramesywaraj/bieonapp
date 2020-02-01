import {createStore, applyMiddleware} from 'redux'
import reducer from './Reducers/index'
import thunk from 'redux-thunk'

const configureStore = () => {
    return createStore(reducer, applyMiddleware(thunk));
}

export default configureStore;