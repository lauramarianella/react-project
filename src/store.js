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
  if (action.type === 'playingDeck') {
    return { ...state, stateIdDeck: action.value, stateDeckIndexQuestion: 0 };
  }
  if (action.type === 'savingAnswer') {
    // alert(action.indexQuestion);
    // alert(action.userAnswer);

    let dataDecks = state.stateDataDecks;
    let objQuestion = dataDecks[state.stateIdDeck].cards[action.indexQuestion];

    let newObjQuestion = { ...objQuestion, userAnswer: action.userAnswer };
    dataDecks[state.stateIdDeck].cards[action.indexQuestion] = newObjQuestion;

    let tmp = state.stateDeckIndexQuestion;
    if (tmp < dataDecks[state.stateIdDeck].cards.length) {
      tmp++;
    }
    //console.log(dataDecks[state.stateIdDeck].cards.length);
    //console.log(dataDecks);
    return {
      ...state,
      stateDeckIndexQuestion: tmp,
      stateDataDecks: dataDecks,
    };
  }

  return state;
};

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
