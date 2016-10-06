import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Router, Route, Link, browserHistory, IndexRoute, Redirect } from 'react-router';
import { userLoginCheckByCookieAction } from '../actions/login.js';
import store from '../state';

class App extends Component {
  componentDidMount () {
    console.log('componentDidMount');
    this.props.userLoginCheckByCookieAction();
  }

  render () {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(
  (state) => {return { login: state.login, };},

  (dispatch) => bindActionCreators({ userLoginCheckByCookieAction }, dispatch)
)(App);
