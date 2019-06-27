import React, { Component } from 'react';
import { connect } from 'react-redux';

class UnconnectedDeckDetails extends Component {
  render = () => {
    let deck = this.props.propsDataDecks.find(
      (deck) => deck.id === parseInt(this.props.propsIdDeck)
    );
    if (deck === undefined) return <div>Deck not found!!</div>;

    let currentCard = deck.cards[0];

    return (
      <div>
        Detalles
        <div>{this.props.propsIdDeck}</div>
        <div>{currentCard.question}</div>
        {currentCard.choices.map((choice) => (
          <div>
            <input type="button" value={choice} />
          </div>
        ))}
      </div>
    );
  };
}

let mapStateToProps = (st) => {
  return {
    propsDataDecks: st.stateDataDecks,
    // propsPlayingIdDeck: st.statePlayingIdDeck,
    // propsPlayingIdCard: st.statePlayingIdCard,
  };
};

let DeckDetails = connect(mapStateToProps)(UnconnectedDeckDetails);
export default DeckDetails;
