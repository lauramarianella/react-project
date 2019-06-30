import { createStore } from 'redux';
import { initialDecks, MIN_NUM_CARDS, MIN_NUM_CARDS_CHOICES } from './data.js';

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

  const choices = [];
  for (let i = 0; i < MIN_NUM_CARDS_CHOICES; i++) {
    choices.push('');
  }

  if (action.type === 'creatingDeck') {
    const cards = [];
    for (let i = 0; i < MIN_NUM_CARDS; i++) {
      cards.push({ question: '', choices: choices, answer: '' });
    }
    let newDataDeck = {
      id: state.stateDataDecks.length,
      title: '',
      cards: cards,
    };

    return {
      ...state,
      stateNewDataDeck: newDataDeck,
    };
  }

  if (action.type === 'insertingDeck') {
    state.stateDataDecks.push(state.stateNewDataDeck);
    return {
      ...state,
      stateDataDecks: { ...state.stateDataDecks },
    };
  }

  if (action.type === '++Card') {
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

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
