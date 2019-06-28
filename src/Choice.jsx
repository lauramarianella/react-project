import React, { Component } from 'react';
import { connect } from 'react-redux';
class UnconnectedChoice extends Component {
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
    return (
      <div>
        <div>
          Choice {this.props.propsIndexChoice} Mark as answer {radioBtn}
        </div>
        <div>
          <input
            type="text"
            placeholder={`Answer ${this.props.propsIndexChoice + 1}`}
          />
        </div>
      </div>
    );
  }
}

let mapStateToProps = (st) => {
  return {};
};

let Choice = connect(mapStateToProps)(UnconnectedChoice);
export default Choice;
