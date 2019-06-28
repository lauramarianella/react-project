import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MIN_NUM_CARDS } from './data.js';
import Card from './Card.jsx';

class UnconnectedCreateDeck extends Component {
  onSubmitHandler(ev) {
    ev.preventDefault();
    alert('Submitting...');

    this.props.dispatch({ type: 'insertingDeck' });
  }

  onChangeHandler = (ev) => {
    this.props.dispatch({
      type: 'onChangeDeck',
      [ev.target.name]: ev.target.value,
    });
  };

  render() {
    const cardArray = [];
    for (let i = 0; i < MIN_NUM_CARDS; i++) {
      cardArray.push(<Card propsIdCard={i} />);
    }

    return (
      <div>
        <div>Creating new deck...</div>
        <div>
          Title:
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={this.props.propsNewDataDeck.title}
            onChange={this.onChangeHandler}
          />
        </div>
        <div>
          <form onSubmit={this.onSubmitHandler}>
            <div>Possible Id: {this.props.propsNewDataDeck.id}</div>
            {cardArray.map((card, i) => {
              return <div key={`keyCard${i}`}>{card}</div>;
            })}
            <div>
              <input type="button" value="Add card" />
            </div>
            <div>
              <input type="submit" value="Submit" />
            </div>
          </form>
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

let CreateDeck = connect(mapStateToProps)(UnconnectedCreateDeck);
export default CreateDeck;
