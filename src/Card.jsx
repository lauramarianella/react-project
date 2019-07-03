import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MIN_NUM_CARDS_CHOICES, MIN_NUM_CARDS } from './data.js';
import Choice from './Choice.jsx';

class UnconnectedCard extends Component {
  onChangeHandler = (ev, i) => {
    this.props.dispatch({
      type: 'onChangeQuestion',
      value: ev.target.value,
      i: i,
    });
  };
  deleteCard = (ev, i) => {
    this.props.dispatch({ type: '--Card', i: i });
  };
  addChoice = (ev, i) => {
    this.props.dispatch({ type: '++Choice', i: i });
  };
  render() {
    let deleteButton =
      this.props.propsIdCard >= MIN_NUM_CARDS ? (
        <input
          type="button"
          value="-"
          onClick={(ev) => this.deleteCard(ev, this.props.propsIdCard)}
        />
      ) : (
        ''
      );

    const choices = [];
    for (
      let i = 0;
      i <
      this.props.propsNewDataDeck.cards[this.props.propsIdCard].choices.length;
      i++
    ) {
      choices.push(
        <Choice propsIdCard={this.props.propsIdCard} propsIndexChoice={i} />
      );
    }
    return (
      <div className="container-subform">
        <div>
          <div>Question: {this.props.propsIdCard}</div>
          <div>
            <input
              type="text"
              placeholder={`Question ${this.props.propsIdCard}`}
              name={this.props.propsIdCard}
              value={
                this.props.propsNewDataDeck.cards[this.props.propsIdCard]
                  .question
              }
              onChange={(ev) =>
                this.onChangeHandler(ev, this.props.propsIdCard)
              }
            />

            {deleteButton}
          </div>
          {choices.map((choice, i) => {
            return <div key={`keyChoice${i}`}>{choice}</div>;
          })}
          <div>
            <input
              type="button"
              value="Add choice"
              onClick={(ev) => this.addChoice(ev, this.props.propsIdCard)}
            />
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (st) => {
  return {
    propsNewDataDeck: st.stateNewDataDeck,
  };
};

let Card = connect(mapStateToProps)(UnconnectedCard);
export default Card;
