import { connect } from 'react-redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';

import { getAccountAction, updateAccountShowAction, updateAccountPasswordAction } from '../../actions/account';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import FormControl from 'react-bootstrap/lib/FormControl';

class UserShowCheckbox extends Component {
  onChange() {
    console.log('change_SHOW!!!');
    this.props.method(this.props.row.id, this.refs.chb.checked);
  }

  render () {
    return (
      <div>
        <input type="checkbox" disabled={!this.props.row.avalible}  ref='chb'  onChange={::this.onChange} defaultChecked={this.props.row.show}/> <b>{this.props.row.name}</b>
      </div>
    );
  }
}

class ModalEdit extends Component {

  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ showModal: nextProps.show });
  }

  close() {
    this.setState({ showModal: false });
  }

  save() {
    var newPassword = ReactDOM.findDOMNode(this.refs.password).value;
    this.props.updateAccountPasswordAction(newPassword);
    this.setState({ showModal: false });
  }

  render () {
    return (
      <div className="static-modal">
        <Modal show={this.state.showModal} onHide={this.close}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit user password</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>

                    <FormGroup >
                      <ControlLabel>Password</ControlLabel>
                      <FormControl ref='password' type="text"  placeholder="Password"/>
                      <FormControl.Feedback />
                      <HelpBlock>new {this.props.user.login} password</HelpBlock>
                    </FormGroup>

                  </Modal.Body>
                  <Modal.Footer>
                    <Button bsStyle="success"  onClick={this.save}>Save</Button>
                    <Button onClick={this.close}>Close</Button>
                  </Modal.Footer>
                </Modal>
      </div>
    );
  }
}

class ChangePassword extends Component {
  constructor (props) {
    super(props);
    this.state = {

    };
  }

  showEdit() {
    this.refs.editModalWindow.setState({ showModal: true });
  }

  render () {
    if (this.props.login.user.type == 'standard') {
      return (
        <div className='col-lg-12'>
          <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Account preference</h3>
            </div>
            <div className="panel-body">
              <div>
                <button type="button" className="btn btn-warning" onClick={::this.showEdit}>
                  <span className='glyphicon glyphicon-edit'></span> Change password
                </button>
                <ModalEdit ref='editModalWindow' user={this.props.login.user} updateAccountPasswordAction={this.props.updateAccountPasswordAction}/>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return false;
    }
  }
}

class Servers extends Component {
  constructor (props) {
    super(props);
    this.state = {

    };
  }

  render () {
    var _this = this;
    return (
      <div className='col-lg-12'>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Visible servers</h3>
          </div>
          <div className="panel-body">
            {this.props.account.my.perm.map(function (row, i) {
              var key = i + '_' + Math.random();
              return <UserShowCheckbox key={key} row={row} user={_this.props.login.user} method={_this.props.updateAccountShowAction} />;
            })}

          </div>
        </div>
      </div>
    );

  }
}

class Account extends Component {

  componentWillMount() {
    this.props.getAccountAction();
  }

  shouldComponentUpdate(newProps, s1)
  {
    if (newProps.account.updateRequre == true) {
      this.props.getAccountAction();
      return false;
    }

    return true;
  }

  render () {

    return (
      <div id='users'>
        <h1 className='page-header'>Account</h1>
        <div className='row'>
          <Servers {...this.props} />
          <ChangePassword {...this.props} />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      account: state.account,
      login: state.login,
    };
  },

  (dispatch) => bindActionCreators({ getAccountAction, updateAccountShowAction, updateAccountPasswordAction }, dispatch)
)(Account);
