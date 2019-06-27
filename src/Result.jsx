import React from 'react';

class UnconnectedResult extends Component {}

let mapStateToProps = (st) => {};
let Result = connect(mapStateToProps)(UnconnectedResult);
export default Result;
