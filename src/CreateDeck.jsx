import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from './Card.jsx';
// import { browserHistory } from 'react-router';
import styled from 'styled-components';

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
    let DivContainer = styled.div`
      background: #4a91f2;
      height: 5px;
    `;

    const cards = [];
    for (let i = 0; i < this.props.propsNewDataDeck.cards.length; i++) {
      cards.push(<Card propsIdCard={i} />);
    }

    return (
      <div className="center-content">
        <div>
          <form onSubmit={this.onSubmitHandler}>
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
              <div>
                <div>
                  {/* <div>Possible Id: {this.props.propsNewDataDeck.id}</div> */}
                  {cards.map((card, i) => {
                    return (
                      <div key={`keyCard${i}`} className="container-form">
                        {card}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div>
              <div>
                <input type="button" onClick={this.addCard} value="Add card" />
              </div>
              <div>
                <button className="card-playBtn" type="submit">
                  Submit
                </button>
              </div>
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
