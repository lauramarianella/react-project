import React, { Component } from 'react';
import { connect } from 'react-redux';
import Result from './Result.jsx';
import './main.css';

class UnconnectedDeckDetails extends Component {
  onClickHandler = (ev) => {
    //alert(ev.target.value);
    this.props.dispatch({
      type: 'savingAnswer',
      userAnswer: ev.target.value,
      indexQuestion: this.props.propsDeckIndexQuestion,
    });
  };
  render = () => {
    let deck = this.props.propsDataDecks.find(
      (deck) => deck.id === parseInt(this.props.propsIdDeck)
    );

    if (deck === undefined) return <div>Deck not found!!</div>;
    //alert(this.props.propsDeckIndexQuestion);
    if (this.props.propsDeckIndexQuestion < deck.cards.length) {
      let currentCard = deck.cards[this.props.propsDeckIndexQuestion];

      return (
        <div key={this.props.propsIdDeck}>
          <div>
            Detalles
            <div>Id Deck: {this.props.propsIdDeck}</div>
            <div>Index Question: {this.props.propsDeckIndexQuestion}</div>
            <div>{currentCard.question}</div>
            {currentCard.choices.map((choice) => (
              <div key={choice}>
                <input
                  type="button"
                  value={choice}
                  onClick={this.onClickHandler}
                />
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Result />
        </div>
      );
    }
  };
}

let mapStateToProps = (st) => {
  return {
    propsDataDecks: st.stateDataDecks,
    propsIdDeck: st.stateIdDeck,
    propsDeckIndexQuestion: st.stateDeckIndexQuestion, //idDeck is passed in the link
  };
};

let DeckDetails = connect(mapStateToProps)(UnconnectedDeckDetails);
export default DeckDetails;
