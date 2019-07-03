import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

class UnconnectedResult extends Component {
  render() {
    let DivAnswer = '';
    let playedDeckArray = this.props.propsDataDecks.filter((deck) => {
      return deck.id == this.props.propsIdDeck;
    });
    let playedDeck = playedDeckArray[0];
    //console.log(playedDeck.cards);
    // alert(playedDeck.title);
    let acc = 0;
    let results = playedDeck.cards.map((card, i) => {
      //console.log(card);
      if (card.answer === card.userAnswer) {
        acc = acc + 1;
        DivAnswer = styled.div`
          color: green;
        `;
      } else {
        acc = acc;
        DivAnswer = styled.div`
          color: red;
        `;
      }
      return (
        <div key={i}>
          <h3>{card.question}</h3>
          <div>Answer: {card.answer}</div>
          <DivAnswer>Your answer: {card.userAnswer}</DivAnswer>
        </div>
      );
    });

    let score = (acc / playedDeck.cards.length) * 100;
    let scoreText = '';
    score <= 0
      ? (scoreText = 'Does not get it all 😞')
      : score < 25
      ? (scoreText = 'Potencial to get it one day 🤔')
      : score < 50
      ? (scoreText = 'Kind of gets it 😐')
      : score < 75
      ? (scoreText = 'On the road to getting it 🙂')
      : score < 100
      ? (scoreText = 'Almost got it 😄')
      : score >= 100
      ? (scoreText = 'Got it 😎')
      : '';

    return (
      <div className="cardsDetails-container">
        {/* <div> played id: {playedDeck.id}</div> */}
        <div className="cardDetails">
          <div className="card-deck-title">
            <h1>Results</h1>
          </div>

          <div className="card-containerBtns">
            <div className="score-results">
              <h1 className="centerText">{scoreText}</h1>
              <h2>{playedDeck.title}</h2>
              <div>{results}</div>
            </div>
            <div>
              <div className="card-playBtn">
                <Link to={`/playDeck/${playedDeck.id}`}>
                  <div>Play again</div>
                </Link>
              </div>
            </div>
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
