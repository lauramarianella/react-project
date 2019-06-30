import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MIN_NUM_CARDS_CHOICES } from './data';
class UnconnectedChoice extends Component {
  onChangeHandler = (ev, j) => {
    this.props.dispatch({
      type: 'onChangeChoice',
      value: ev.target.value,
      i: this.props.propsIdCard,
      j: j,
    });
  };

  deleteChoice = (ev, j) => {
    this.props.dispatch({
      type: '--Choice',
      i: this.props.propsIdCard,
      j: j,
    });
  };

  render() {
    let radioBtn = (
      <input
        type="radio"
        name={this.props.propsIdCard}
        value={this.props.propsIndexChoice}
      />
    );
    if (this.props.propsIndexChoice === 0)
      radioBtn = (
        <input
          type="radio"
          name={this.props.propsIdCard}
          value={this.props.propsIndexChoice}
          checked
        />
      );

    let deleteButton =
      this.props.propsIndexChoice >= MIN_NUM_CARDS_CHOICES ? (
        <input
          type="button"
          value="-"
          onClick={(ev) => this.deleteChoice(ev, this.props.propsIndexChoice)}
        />
      ) : (
        ''
      );

    return (
      <div>
        <div>
          Choice {this.props.propsIndexChoice} Mark as answer {radioBtn}
        </div>
        <div>
          <input
            type="text"
            placeholder={`Answer ${this.props.propsIndexChoice}`}
            value={
              this.props.propsNewDataDeck.cards[this.props.propsIdCard].choices[
                this.props.propsIndexChoice
              ]
            }
            onChange={(ev) =>
              this.onChangeHandler(ev, this.props.propsIndexChoice)
            }
          />
          {deleteButton}
        </div>
      </div>
    );
  }
}

let mapStateToProps = (st) => {
  return { propsNewDataDeck: st.stateNewDataDeck };
};

let Choice = connect(mapStateToProps)(UnconnectedChoice);
export default Choice;
