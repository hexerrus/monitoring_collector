import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signOut } from '../actions/login.js';
import { MoveTo }  from './move-to';

class SignOutClass extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.signOut();
  }

  render() {

    return (
      <MoveTo to='/' />
    );
  }
}

export default connect(
  (state) => {
    return {
      login: state.login,
    };
  },
  (dispatch) => bindActionCreators({ signOut }, dispatch),
)(SignOutClass);
