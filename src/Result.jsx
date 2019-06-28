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
    return (
      <div>
        <div> played id: {playedDeck.id}</div>
        <div> played title: {playedDeck.title}</div>
        <div>
          {playedDeck.cards.map((card, i) => {
            //console.log(card);
            return (
              <div key={i}>
                <h3>{card.question}</h3>
                <div>Answer: {card.answer}</div>
                <div>Your answer: {card.userAnswer}</div>
              </div>
            );
          })}
        </div>
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
