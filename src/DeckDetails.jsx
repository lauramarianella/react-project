import React, { Component } from 'react';
import { connect } from 'react-redux';
import Result from './Result.jsx';
import './main.css';
import styled from 'styled-components';

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

      let progressPercentage = Math.round(
        ((this.props.propsDeckIndexQuestion + 0) / deck.cards.length) * 100
      );
      // console.log(this.props.propsDeckIndexQuestion);
      // console.log(deck.cards.length);
      // console.log(progressPercentage);

      let DivProgressBar = styled.div`
        background: #4a91f2;
        height: 5px;
        width: ${progressPercentage}%;
      `;

      return (
        <div key={this.props.propsIdDeck} className="cardsDetails-container">
          <div className="cardDetails">
            {/* Detalles */}
            {/* <div>Id Deck: {this.props.propsIdDeck}</div> */}
            {/* <div>Index Question: {this.props.propsDeckIndexQuestion}</div> */}
            <div className="card-deck-title">
              <h2>{currentCard.question}</h2>
            </div>
            <div className="container-progress-bar">
              <DivProgressBar />
              {/* <div className="progress-bar" /> */}
            </div>
            <div className="card-containerBtns">
              {currentCard.choices.map((choice) => (
                // <div className="card-playBtn" key={choice}>
                //   <a href="#" onClick={this.onClickHandler}>
                //     <div>{choice}</div>
                //   </a>
                // </div>
                // <div key={choice}>
                <button
                  onClick={this.onClickHandler}
                  value={choice}
                  className="card-playBtn"
                >
                  {choice}
                </button>
                // </div>
              ))}
            </div>
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
