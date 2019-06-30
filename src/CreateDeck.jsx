import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MIN_NUM_CARDS } from './data.js';
import Card from './Card.jsx';

class UnconnectedCreateDeck extends Component {
  onSubmitHandler = (ev) => {
    ev.preventDefault();
    this.props.dispatch({ type: 'insertingDeck' });
  };

  onChangeHandler = (ev) => {
    this.props.dispatch({
      type: 'onChangeTitle',
      [ev.target.name]: ev.target.value,
    });
  };

  addCard = (ev) => {
    this.props.dispatch({ type: '++Card' });
  };

  render() {
    const cards = [];
    for (let i = 0; i < this.props.propsNewDataDeck.cards.length; i++) {
      cards.push(<Card propsIdCard={i} />);
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
            {cards.map((card, i) => {
              return <div key={`keyCard${i}`}>{card}</div>;
            })}
            <div>
              <input type="button" value="Add card" onClick={this.addCard} />
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
