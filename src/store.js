import { createStore } from 'redux';
import { initialDecks } from './data.js';

let initialState = {
  stateDataDecks: initialDecks,
  stateQueryDeckTitle: '',
};

let reducer = (state, action) => {
  if (action.type === 'queryDeckTitle') {
    return { ...state, stateQueryDeckTitle: action.value };
  }
  return state;
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
