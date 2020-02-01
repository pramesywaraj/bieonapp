import React from 'react'
import { Provider } from 'react-redux'
import configureStore from './Redux/store'
import Home from './routes'

const store = configureStore();


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}
