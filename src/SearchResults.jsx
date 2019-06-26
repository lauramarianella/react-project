import React, { Component } from 'react';
import { connect } from 'react-redux';

class UnconnectedSearchResults extends Component {
  render = () => {
    let decks;
    this.props.propsQueryDeckTitle === ''
      ? (decks = this.props.propsDataDecks)
      : (decks = this.props.propsDataDecks.filter((deck) => {
          return deck.title
            .toLowerCase()
            .includes(this.props.propsQueryDeckTitle.toLowerCase());
        }));

    return (
      <div>
        <div>{this.props.tittle}</div>
        <div>StateQueryDeck: {this.props.propsQueryDeckTitle}</div>
        {decks.map((deck) => {
          return (
            <div key={deck.id}>
              <div>{deck.title}</div>
              <div>
                <input type="button" value="Play" />
              </div>
            </div>
          );
        })}
      </div>
    );
  };
}

let mapStateToProps = (st) => {
  return {
    propsDataDecks: st.stateDataDecks,
    propsQueryDeckTitle: st.stateQueryDeckTitle,
  };
};

let SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);

export default SearchResults;
