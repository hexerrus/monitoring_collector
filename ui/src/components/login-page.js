import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//actions
import { getDefaultSettingsAction } from '../actions/settings.js';
import { userLoginAction } from '../actions/login.js';

import { MoveTo } from './move-to';
import Loader from 'react-loader';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      use_ldap: false,
      type: 'standard',
    };
  }

  submit (e) {
    e.preventDefault();
    this.props.userLoginAction(this.refs.login.value, this.refs.pass.value, this.state.type);
  }

  componentDidMount() {
    this.props.getDefaultSettingsAction();
  }

  setStandard() {
    this.setState({ type: 'standard', });
  }

  setLdap() {
    this.setState({ type: 'ldap', });
  }

  componentWillReceiveProps(newProps) {
    console.log('settings:', newProps.settings);
    var type = newProps.settings.ldap_is_primary ? 'ldap' : 'standard';
    this.setState({ use_ldap: newProps.settings.use_ldap, type: type });
  }

  render() {
    var errorResult = false;
    if (this.props.login.error != undefined) errorResult = <h4 style={{ color: 'red', }}>{this.props.login.error}</h4>;
    return (

        <div className="container">
          <MoveTo to='/app' if={this.props.login.login} />
          <Loader loaded={!this.props.login.auth}>
            <Loader loaded={this.props.settings.loaded}>
              <form onSubmit={::this.submit} className="form-signin">
                <h2 className="form-signin-heading">Please sign in</h2>
                <label htmlFor="inputEmail" className="sr-only">Login</label>
                <input ref="login" type="text" id="inputEmail" className="form-control" placeholder="Login" required />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input ref="pass" type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                { this.state.use_ldap ?
                  <div className="btn-group btn-group-justified" style={{ 'margin-bottom': 10, }} role="group" >
                    <div className="btn-group" role="group">
                      <button type="button" rel='setStandardBtn' onClick={::this.setStandard} className={(this.state.type == 'standard') ? 'btn btn-primary' : 'btn btn-default' }>Standard</button>
                    </div>
                    <div className="btn-group" role="group">
                      <button type="button" rel='setLdapBtn' onClick={::this.setLdap} className={(this.state.type == 'ldap') ? 'btn btn-primary' : 'btn btn-default' }>Ldap</button>
                    </div>
                  </div> :
                  ''
                }

                <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                {errorResult}
              </form>
            </Loader>
          </Loader>
        </div>
      );
  }
};

export default connect(
  (state) => {
    return {
      login: state.login,
      settings: state.settings,
    };
  },

  (dispatch) => bindActionCreators({ userLoginAction, getDefaultSettingsAction }, dispatch)
)(LoginPage);
