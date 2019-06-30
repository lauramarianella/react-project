import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UnconnectedResult extends Component {
  render() {
    let playedDeckArray = this.props.propsDataDecks.filter((deck) => {
      return deck.id == this.props.propsIdDeck;
    });
    let playedDeck = playedDeckArray[0];
    //console.log(playedDeck.cards);
    // alert(playedDeck.title);
    let acc = 0;
    let results = playedDeck.cards.map((card, i) => {
      //console.log(card);
      acc = card.answer === card.userAnswer ? acc + 1 : acc;
      return (
        <div key={i}>
          <h3>{card.question}</h3>
          <div>Answer: {card.answer}</div>
          <div>Your answer: {card.userAnswer}</div>
        </div>
      );
    });

    let score = (acc / playedDeck.cards.length) * 100;
    let scoreText = '';
    score <= 0
      ? (scoreText = score + 'Does not get it all 😞')
      : score < 25
      ? (scoreText = score + 'Potencial to get it one day 🤔')
      : score < 50
      ? (scoreText = score + 'Kind of gets it 😐')
      : score < 75
      ? (scoreText = score + 'On the road to getting it 🙂')
      : score < 100
      ? (scoreText = score + 'Almost got it 😄')
      : score >= 100
      ? (scoreText = score + 'Got it 😎')
      : '';

    return (
      <div>
        <div> played id: {playedDeck.id}</div>
        <div> played title: {playedDeck.title}</div>
        <div>{scoreText}</div>
        <div>{results}</div>
        <div>
          <div>
            <Link to={`/playDeck/${playedDeck.id}`}>Play again</Link>
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (st) => {
  return {
    propsDataDecks: st.stateDataDecks,
    propsIdDeck: st.stateIdDeck,
  };
};

let Result = connect(mapStateToProps)(UnconnectedResult);
export default Result;
