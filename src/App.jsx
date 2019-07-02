import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import SearchResults from './SearchResults.jsx';
import DeckDetails from './DeckDetails.jsx';
import CreateDeck from './CreateDeck.jsx';
import { connect } from 'react-redux';
import './main.css';

class UnconnectedApp extends Component {
  renderAllDecks = () => {
    return (
      // <div className="cards-container">
      <SearchResults tittle="Search Results:" />
      // </div>
    );
  };
  renderCreateDeck = () => {
    //return <div>Create new Decks</div>;
    this.props.dispatch({ type: 'creatingDeck' });
    return <CreateDeck />;
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
  componentDidMount() {
    //alert('componentDidMount() ');
  }

  render = () => {
    return (
      <BrowserRouter>
        <div>
          <div className="nav">
            <div id="logo">
              <a href="#">
                <div>{this.props.tittle}</div>
                {/* <img src="imgs/logo.svg" /> */}
              </a>
            </div>
            <div className="nav-link">
              <input
                type="text"
                placeholder="Search deck"
                onChange={this.onChangeHandler}
                className="text-field"
              />
            </div>
            <div className="nav-link">
              <Link to="/">Home</Link>
            </div>
            <div className="nav-link">
              <Link to="/createDeck">Create deck</Link>
            </div>
            <button class="mobile-nav">
              <img src="/imgs/menu.svg" />
              <div class="mobile-menu">
                <ul>
                  <li>
                    <div className="mobile-nav-link">
                      <input
                        type="text"
                        placeholder="Search deck"
                        onChange={this.onChangeHandler}
                        className="text-field"
                      />
                    </div>
                  </li>
                  <li>
                    <div className="mobile-nav-link">
                      <Link to="/">Home</Link>
                    </div>
                  </li>
                  <li>
                    <div className="mobile-nav-link">
                      <Link to="/createDeck">Create deck</Link>
                    </div>
                  </li>
                </ul>
              </div>
            </button>
          </div>
          <div className="container">
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
