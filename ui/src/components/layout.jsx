import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cookie from 'react-cookie';

class ApplicationLayout extends Component {
  render() {
    var checkUrl = (url) => {
      if (url == window.location.pathname) {
        return true;
      } else {
        return false;
      }
    };

    var serversLink = false;
    var usersLink = false;
    if (this.props.login.admin == true) {
      serversLink = <li className={(checkUrl('/app/servers') ? 'active' : '')}><Link to="/app/servers">Servers</Link></li>;
      usersLink = <li className={(checkUrl('/app/users') ? 'active' : '')}><Link to="/app/users">Users</Link></li>;
    }

    return (
        <div className='row'>
          <div className="col-lg-12">
            <div className='panel-body'>
              <ul className="nav nav-tabs">
                <li className={(checkUrl('/app') ? 'active' : '')}><Link to="/app">Monitoring</Link></li>
                {serversLink}
                {usersLink}
                <li className={(checkUrl('/app/account') ? 'active' : '')}><Link to="/app/account">Account</Link></li>
                <li><Link to="/sign_out">Logout</Link></li>
              </ul>
            </div>

            <div className="tab-content">
              <div className="col-lg-12" id="main_content">
                {this.props.children}
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default connect(
  (state) => {return { login: state.login, }; },

  (dispatch) => bindActionCreators({}, dispatch)
)(ApplicationLayout);
