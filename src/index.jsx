import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import store from './store.js';
import { Provider } from 'react-redux';

ReactDOM.render(
  <Provider store={store}>
    <App tittle="Go it!" />
  </Provider>,
  document.getElementById('root')
);
