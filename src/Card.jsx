import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MIN_NUM_CARDS_CHOICES } from './data.js';
import Choice from './Choice.jsx';

class UnconnectedCard extends Component {
  onChangeHandler = (ev) => {
    alert([ev.target.name]);

    this.props.dispatch({
      type: 'onChangeDeck',
      [ev.target.name]: ev.target.value,
    });
  };
  render() {
    const choiceArray = [];
    for (let i = 0; i < MIN_NUM_CARDS_CHOICES; i++) {
      choiceArray.push(
        <Choice
          propsIdCard={this.props.propsIdCard}
          propsIndexChoice={i}
          onChange={this.onChangeHandler}
        />
      );
    }
    return (
      <div>
        <div>
          <div>Question: {this.props.propsIdCard}</div>
          <div>
            <input
              type="text"
              placeholder={`Question ${this.props.propsIdCard}`}
              name={this.props.propsIdCard}
              value=""
              onChange={this.onChangeHandler}
            />
          </div>
          {choiceArray.map((choice, i) => {
            return <div key={`keyChoice${i}`}>{choice}</div>;
          })}
          <div>
            <input type="button" value="Remove choice" />
          </div>
          <div>
            <Choice
              propsIdCard={this.props.propsIdCard}
              propsIndexChoice={choiceArray.length}
              onChange={this.onChangeHandler}
            />
          </div>
          <div>
            <input type="button" value="Remove choice" />
          </div>
          <div>
            <input type="button" value="Add choice" />
          </div>
        </div>
      </div>
    );
  }
}

let mapStateToProps = (st) => {
  return { propsNewDataDeck: st.stateNewDataDeck };
};

let Card = connect(mapStateToProps)(UnconnectedCard);
export default Card;
