import { createStore } from 'redux';
import { initialDecks, MIN_NUM_CARDS, MIN_NUM_CARDS_CHOICES } from './data.js';

import { persistStore, persistReducer, autoRehydrate } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';

let initialState = {
  stateDataDecks: initialDecks,
  stateQueryDeckTitle: '',
};

let initialatingChoices = () => {
  const choices = [];
  for (let i = 0; i < MIN_NUM_CARDS_CHOICES; i++) {
    choices.push(`Answer ${i}`);
  }
  return choices;
};
let initialatingDeck = () => {
  const choices = initialatingChoices();

  const cards = [];
  for (let i = 0; i < MIN_NUM_CARDS; i++) {
    cards.push({
      question: 'Question?',
      choices: choices,
      answer: `Answer ${i}`,
    });
  }

  let newDataDeck = {
    id: 0, //state.stateDataDecks.length,
    title: 'Title',
    cards: cards,
  };
  return newDataDeck;
};

let rootReducer = (state = initialState, action) => {
  if (action.type === 'queryDeckTitle') {
    return { ...state, stateQueryDeckTitle: action.value };
  }
  if (action.type === 'playingDeck') {
    return { ...state, stateIdDeck: action.value, stateDeckIndexQuestion: 0 };
  }
  if (action.type === 'savingAnswer') {
    let dataDecks = state.stateDataDecks;
    let objQuestion = dataDecks[state.stateIdDeck].cards[action.indexQuestion];

    let newObjQuestion = { ...objQuestion, userAnswer: action.userAnswer };
    dataDecks[state.stateIdDeck].cards[action.indexQuestion] = newObjQuestion;

    let tmp = state.stateDeckIndexQuestion;
    if (tmp < dataDecks[state.stateIdDeck].cards.length) {
      tmp++;
    }

    return {
      ...state,
      stateDeckIndexQuestion: tmp,
      stateDataDecks: dataDecks,
    };
  }

  if (action.type === 'creatingDeck') {
    let newDataDeck = initialatingDeck();
    newDataDeck.id = state.stateDataDecks.length;
    return {
      ...state,
      stateNewDataDeck: newDataDeck,
    };
  }

  if (action.type === 'insertingDeck') {
    state.stateDataDecks.push(state.stateNewDataDeck);
    let newDataDeck = initialatingDeck();
    newDataDeck.id = state.stateDataDecks.length;
    let newState = {
      ...state,
      stateNewDataDeck: newDataDeck,
      stateDataDecks: state.stateDataDecks,
    };
    return newState;
  }

  if (action.type === '++Card') {
    let choices = initialatingChoices();
    state.stateNewDataDeck.cards.push({
      question: '',
      choices: choices,
      answer: '',
    });
    return {
      ...state,
      stateNewDataDeck: { ...state.stateNewDataDeck },
    };
  }

  if (action.type === '--Card') {
    state.stateNewDataDeck.cards.splice(action.i, 1);
    return {
      ...state,
      stateNewDataDeck: { ...state.stateNewDataDeck },
    };
  }

  if (action.type === 'onChangeTitle') {
    const stateNewDataDeck = { ...state.stateNewDataDeck };
    stateNewDataDeck.title = action.title;
    return { ...state, stateNewDataDeck };
  }

  if (action.type === 'onChangeQuestion') {
    state.stateNewDataDeck.cards[action.i].question = action.value;
    return {
      ...state,
      stateNewDataDeck: { ...state.stateNewDataDeck },
    };
  }

  if (action.type === '++Choice') {
    state.stateNewDataDeck.cards[action.i].choices.push('');
    return {
      ...state,
      stateNewDataDeck: { ...state.stateNewDataDeck },
    };
  }

  if (action.type === 'onChangeChoice') {
    state.stateNewDataDeck.cards[action.i].choices[action.j] = action.value;
    return {
      ...state,
      stateNewDataDeck: { ...state.stateNewDataDeck },
    };
  }
  if (action.type === 'onChangeAnswer') {
    state.stateNewDataDeck.cards[action.i].answer =
      state.stateNewDataDeck.cards[action.i].choices[action.j];
    //console.log(state.stateNewDataDeck);
    return {
      ...state,
      stateNewDataDeck: { ...state.stateNewDataDeck },
    };
  }

  if (action.type === '--Choice') {
    console.log(state.stateNewDataDeck.cards[action.i].choices);
    state.stateNewDataDeck.cards[action.i].choices.splice(action.j, 1);
    return {
      ...state,
      stateNewDataDeck: { ...state.stateNewDataDeck },
    };
  }

  return state;
};

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.log(e);
  }
}
function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

// const store = createStore(
//   reducer,
//   initialState,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

//export default store;
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
  whitelist: ['stateDataDecks', 'stateQueryDeckTitle'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const persistedState = loadFromLocalStorage();
//localStorage.clear();
export let store = createStore(
  // rootReducer,
  // initialState,
  persistedReducer,
  persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.subscribe(() => saveToLocalStorage(store.getState()));

//persistStore(this.props).purge();

export let persistor = persistStore(store);
