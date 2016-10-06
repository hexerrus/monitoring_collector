import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Router, Route, Link, browserHistory, IndexRoute, Redirect } from 'react-router';
import { MoveTo } from './move-to';
import React from 'react';
import  ApplicationLayout  from './layout';

class Application extends Component {
  render() {
    var ret;
    if (this.props.login.login == undefined) {
      ret = <div></div>;
    } else {
      if (this.props.login.login == false) {
        ret = <MoveTo to="/" />;
      } else {

        ret =  <ApplicationLayout>{this.props.children}</ApplicationLayout>;
      }
    }

    return (
      <div>
        {ret}
      </div>
    );

  }
};

export default connect(
  (state) => {
    return {
      login: state.login,
    };
  },

  (dispatch) => bindActionCreators({ }, dispatch),
)(Application);
