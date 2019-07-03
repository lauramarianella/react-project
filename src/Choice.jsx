import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MIN_NUM_CARDS_CHOICES } from './data';
class UnconnectedChoice extends Component {
  onChangeHandler = (ev, j) => {
    // alert(ev.target.name);
    this.props.dispatch({
      type: 'onChangeChoice',
      value: ev.target.value,
      i: this.props.propsIdCard,
      j: j,
    });
  };

  onChangeAnswerHandler = (ev, j) => {
    //alert(ev.target.name);
    this.props.dispatch({
      type: 'onChangeAnswer',
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
      // <div>
      <input
        type="radio"
        name={this.props.propsIdCard}
        value={
          this.props.propsNewDataDeck.cards[this.props.propsIdCard].choices[
            this.props.propsIndexChoice
          ]
        }
        onChange={(ev) =>
          this.onChangeAnswerHandler(ev, this.props.propsIndexChoice)
        }
        checked={
          this.props.propsNewDataDeck.cards[this.props.propsIdCard].answer ===
          this.props.propsNewDataDeck.cards[this.props.propsIdCard].choices[
            this.props.propsIndexChoice
          ]
        }
      />
      //   <div>
      //     Value:
      //     {
      //       this.props.propsNewDataDeck.cards[this.props.propsIdCard].choices[
      //         this.props.propsIndexChoice
      //       ]
      //     }
      //   </div>
      //  </div>
    );

    let deleteButton =
      this.props.propsIndexChoice >= MIN_NUM_CARDS_CHOICES ? (
        <input
          type="button"
          value="Remove choice"
          onClick={(ev) => this.deleteChoice(ev, this.props.propsIndexChoice)}
        />
      ) : (
        ''
      );

    return (
      <div>
        <div>
          <span className="spanLeft">Choice {this.props.propsIndexChoice}</span>{' '}
          <span className="spanRight">Mark as answer {radioBtn}</span>
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
            className="text-field-new"
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
