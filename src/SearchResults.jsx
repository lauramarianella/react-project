import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
              <form name={deck.id} onSubmit={this.onSubmitHandler}>
                <div>
                  {deck.id} - {deck.title}
                </div>
                <div>
                  <Link to={`/playDeck/${deck.id}`}>Play</Link>
                </div>
              </form>
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
