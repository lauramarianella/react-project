import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import './main.css';

class UnconnectedSearchResults extends Component {
  render = () => {
    let decks = [];
    this.props.propsQueryDeckTitle === ''
      ? (decks = this.props.propsDataDecks)
      : (decks = this.props.propsDataDecks.filter((deck) => {
          return deck.title
            .toLowerCase()
            .includes(this.props.propsQueryDeckTitle.toLowerCase());
        }));
    // console.log('After SearchResults...');
    // console.log(decks);

    return (
      <div className="cards-container">
        {decks.map((deck) => {
          return (
            <div key={deck.id} className="card-container">
              <form name={deck.id} onSubmit={this.onSubmitHandler}>
                <div className="card">
                  <div className="card-deck-title center-content">
                    {deck.title} {/* {deck.id} - */}
                  </div>
                  <div className="card-containerBtns">
                    <div className="card-playBtn">
                      <Link to={`/playDeck/${deck.id}`}>
                        <div>Play</div>
                      </Link>
                    </div>
                  </div>
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
