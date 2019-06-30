import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
// import store from './store.js';
import { store, persistor } from './store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// ... normal setup, create store and persistor, import components etc.

const MyApp = () => {
  //persistor.purge();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App tittle="Go it!" />
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<MyApp />, document.getElementById('root'));
