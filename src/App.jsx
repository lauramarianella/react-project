import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import SearchResults from './SearchResults.jsx';
import DeckDetails from './DeckDetails.jsx';
import { connect } from 'react-redux';
import './main.css';

class UnconnectedApp extends Component {
  renderAllDecks = () => {
    return (
      <div>
        <SearchResults tittle="Search Results:" />
      </div>
    );
  };
  renderCreateDeck = () => {
    return <div>Create new Decks</div>;
  };
  renderPlayDeck = (renderParameter) => {
    let idDeck = renderParameter.match.params.dId;
    //alert(idDeck);
    this.props.dispatch({ type: 'playingDeck', value: idDeck });
    return <DeckDetails />; //<DeckDetails propsLinkIdDeck={idDeck} />
  };

  onChangeHandler = (ev) => {
    this.props.dispatch({ type: 'queryDeckTitle', value: ev.target.value });
  };
  componentDidMount() {}

  render = () => {
    return (
      <BrowserRouter>
        <div className="container">
          <div>{this.props.tittle}</div>
          <div>
            <input
              type="text"
              placeholder="Search deck"
              onChange={this.onChangeHandler}
            />
            {/* <div>StateQueryDeck: {this.props.propsQueryDeckTitle}</div> */}
          </div>
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/createDeck">Create deck</Link>
          </div>
          <Route exact={true} path="/" render={this.renderAllDecks} />
          <Route
            exact={true}
            path="/playDeck/:dId"
            render={this.renderPlayDeck}
          />
          <Route
            exact={true}
            path="/createDeck"
            render={this.renderCreateDeck}
          />
        </div>
      </BrowserRouter>
    );
  };
}

let mapStateToProps = (st) => {
  return {
    propsDataDecks: st.stateDataDecks,
    propsQueryDeckTitle: st.stateQueryDeckTitle,
  };
};

let App = connect(mapStateToProps)(UnconnectedApp);
export default App;
