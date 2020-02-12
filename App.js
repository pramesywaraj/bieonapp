import React from 'react';
import {Provider} from 'react-redux';
import store from './Redux/store';
import Home from './Navigations/routes';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}
