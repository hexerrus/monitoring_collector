import { connect } from 'react-redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';

import { getUsersAction, changeUserAvalibleAction, changeUserShowAction,
  updateUserPasswordAction, deleteUserAction, updateUserRequire, updateUserAdminAction } from '../../actions/user.js';
import { getLdapSettingAction, setLdapSettingAction, testLdapSettingAction } from '../../actions/settings.js';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import FormControl from 'react-bootstrap/lib/FormControl';

class ModalChangeAdmin extends Component {

  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ showModal: nextProps.show });
  }

  close() {
    console.log('close!!!!');
    this.props.closeCb();
    this.setState({ showModal: false });
  }

  ok() {
    console.log('SURE!!!!', this.props.enable);
    this.props.okCb();
    this.setState({ showModal: false });
  }

  render () {
    return (
      <div className="static-modal">
        <Modal show={this.state.showModal} onHide={::this.close}>
                  <Modal.Header closeButton>
                    <Modal.Title>Admin</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure ?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button bsStyle="success" onClick={::this.ok}>Ok</Button>
                    <Button onClick={::this.close}>Close</Button>
                  </Modal.Footer>
                </Modal>
      </div>
    );
  }
}

class UserAdminCheckbox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      enable: this.props.user.admin,
    };
  };

  onChange() {
    console.log('onChange', this.refs.chb.cheked);
    this.refs.modalChangeAdmin.setState({ showModal: true });
  }

  save() {
    console.log('save');
    this.props.updateUserAdminAction(this.props.user.id, this.refs.chb.checked);
  }

  close() {
    console.log('close');
    this.props.updateUserRequire();
  }

  render () {
    return (
      <div >
        <input type="checkbox" ref='chb' onChange={::this.onChange} defaultChecked={this.state.enable}/>
        <ModalChangeAdmin ref='modalChangeAdmin' okCb={::this.save} closeCb={::this.close}/>
      </div>
    );
  }
}

class UserAvalibleCheckbox extends Component {

  onChange() {
    console.log('change!!!');
    console.log(this.refs.chb.checked);
    this.props.method(this.props.user.id, this.props.row.id, this.refs.chb.checked);
  }

  render () {
    //console.warn(this.props);
    return (
      <div>
        <input type="checkbox" ref='chb' onChange={::this.onChange} defaultChecked={this.props.row.avalible}/> <b>{this.props.row.name}</b>
        <ModalChangeAdmin />
      </div>
    );
  }
}

class UserShowCheckbox extends Component {
  onChange() {
    console.log('change_SHOW!!!');
    this.props.method(this.props.user.id, this.props.row.id, this.refs.chb.checked);
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
    this.props.updateUserPasswordAction(this.props.user.id, newPassword);
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

class ModalDelete extends Component {

  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.close = this.close.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ showModal: nextProps.show });
  }

  close() {
    this.setState({ showModal: false });
  }

  delete() {
    this.props.deleteUserAction(this.props.user.id);
    this.setState({ showModal: false });
  }

  render () {
    return (
      <div className="static-modal">
        <Modal show={this.state.showModal} onHide={this.close}>
                  <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div><b>Please confirm</b></div>
                    <div>User:{this.props.user.login}</div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button bsStyle="danger" onClick={this.delete}>Delete</Button>
                    <Button onClick={this.close}>Close</Button>
                  </Modal.Footer>
                </Modal>
      </div>
    );
  }
}

class UserTr extends Component {

  showEdit() {

    this.refs.editModalWindow.setState({ showModal: true });
  }

  showDelete() {
    this.refs.deleteModalWindow.setState({ showModal: true });
  }

  render () {
    return (
      <tr>
        <td>{this.props.currentUser.login} ({this.props.currentUser.user_type})</td>
        <td><UserAdminCheckbox user={this.props.currentUser} updateUserRequire={this.props.updateUserRequire} updateUserAdminAction={this.props.updateUserAdminAction} /></td>
        <td>
          {this.props.currentUser.perm.map((row, i)=> {
            var key = i + '_' + Math.random();
            return <UserAvalibleCheckbox key={key} row={row} user={this.props.currentUser} method={this.props.changeUserAvalibleAction} />;
          })}
        </td>
        <td>
          {this.props.currentUser.perm.map((row, i)=> {
            var key = i + '_' + Math.random();
            return <UserShowCheckbox key={key} row={row} user={this.props.currentUser} method={this.props.changeUserShowAction} />;
          })}
        </td>
        <td>
          { this.props.currentUser.user_type == 'standard' ?
          <button type="button" className="btn btn-warning" onClick={::this.showEdit}>
            <span className='glyphicon glyphicon-edit'></span>
          </button> :
          false }
          <button type="button" className="btn btn-danger" onClick={::this.showDelete}>
            <span className='glyphicon glyphicon-trash'></span>
          </button>
          <ModalEdit ref='editModalWindow' user={this.props.currentUser} updateUserPasswordAction={this.props.updateUserPasswordAction}/>
          <ModalDelete ref='deleteModalWindow' user={this.props.currentUser} deleteUserAction={this.props.deleteUserAction}/>
        </td>
      </tr>
    );
  }
}

class UsersBlock extends Component {
  render () {
    var _this = this;
    return (
      <div className='col-lg-12'>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Users</h3>
          </div>
          <div className="panel-body">
            <table className='table'>
              <thead>
                <tr>
                  <th>Username (type)</th>
                  <th>Admin</th>
                  <th>Avalible</th>
                  <th>Show</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {this.props.user.all.map((row, i) => {
                  var key = i + '_' + Math.random();
                  return <UserTr key={key} currentUser={row}
                    changeUserAvalibleAction={_this.props.changeUserAvalibleAction}
                    changeUserShowAction={_this.props.changeUserShowAction}
                    deleteUserAction={_this.props.deleteUserAction}
                    updateUserPasswordAction={_this.props.updateUserPasswordAction}
                    updateUserRequire={_this.props.updateUserRequire}
                    updateUserAdminAction={_this.props.updateUserAdminAction} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

class LdapBlock extends Component {

  componentWillMount() {
    this.props.getLdapSettingAction();
  }

  shouldComponentUpdate(newProps, s1)
  {
    if (newProps.user.ldapUpdateRequre == true) {
      this.props.getLdapSettingAction();
      return false;
    }

    return true;
  }

  toggleLdap() {
    console.log('ldap now:', this.refs.toggleLdap.checked);
    this.props.setLdapSettingAction({ use_ldap: this.refs.toggleLdap.checked, });
  }

  toggleLdapPrimary() {
    var newLdapPrimaryParams = this.refs.toggleLdapPrimary.checked;

  }

  save() {
    console.log('save');
    this.props.setLdapSettingAction(
      {
        use_ldap: this.refs.toggleLdap.checked,
        ldap_is_primary: this.refs.toggleLdapPrimary.checked,
        ldap_server: ReactDOM.findDOMNode(this.refs.ldap_server).value,
        base_dn: ReactDOM.findDOMNode(this.refs.base_dn).value,
        user_attribute: ReactDOM.findDOMNode(this.refs.user_attribute).value,
      }
    );

  }

  test() {
    var testLogin = ReactDOM.findDOMNode(this.refs.testLogin).value;
    var testPassword = ReactDOM.findDOMNode(this.refs.testPassword).value;
    console.log('testit', { testLogin: testLogin, testPassword: testPassword });
    this.props.testLdapSettingAction({ testLogin: testLogin, testPassword: testPassword });
  }

  render () {
    var resultBlock = false;
    if (this.props.user.test_result.bind != undefined) {
      if (this.props.user.test_result.bind) {
        resultBlock =  <b style={{ color: 'green' }}>SUCCESS!!!</b>;
      } else {
        resultBlock =  <b style={{ color: 'red' }}>FAIL =( , error: {this.props.user.test_result.error}</b>;
      }
    }

    return (
      <div className='col-lg-12'>
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Ldap authentication</h3>
          </div>
          <div className="panel-body">
            <input type='checkbox' ref='toggleLdap' defaultChecked={this.props.user.ldap.use_ldap} onChange={::this.toggleLdap} /> <b> Ldap enabled</b>
             { this.props.user.ldap.use_ldap ?
              <div>
                <input type='checkbox' ref='toggleLdapPrimary' defaultChecked={this.props.user.ldap.ldap_is_primary}/> <b> Ldap is primary</b>
                <h3>Ldap configuration:</h3>
                <FormGroup >
                  <ControlLabel>LDAP server url</ControlLabel>
                  <FormControl ref='ldap_server' type="text" defaultValue={this.props.user.ldap.ldap_server} placeholder="server url"/>
                  <FormControl.Feedback />
                  <HelpBlock>example: ldap://192.168.1.1</HelpBlock>
                </FormGroup>
                <FormGroup >
                  <ControlLabel>Base DN</ControlLabel>
                  <FormControl ref='base_dn' type="text" defaultValue={this.props.user.ldap.base_dn} placeholder="Base DN"/>
                  <FormControl.Feedback />
                  <HelpBlock>example: DC=domain, DC=com</HelpBlock>
                </FormGroup>
                <FormGroup >
                  <ControlLabel>User attribute</ControlLabel>
                  <FormControl ref='user_attribute' type="text" defaultValue={this.props.user.ldap.user_attribute} placeholder="cn"/>
                  <FormControl.Feedback />
                  <HelpBlock>example: cn</HelpBlock>
                </FormGroup>
                <Button bsStyle="success" onClick={::this.save}>Save</Button>

                <hr />
                <h4>Test it:</h4>
                  <FormGroup >
                    <ControlLabel>Login</ControlLabel>
                    <FormControl ref='testLogin' type="text"  placeholder="login"/>
                    <FormControl.Feedback />
                  </FormGroup>
                  <FormGroup >
                    <ControlLabel>Password</ControlLabel>
                    <FormControl ref='testPassword' type="password"  placeholder="password"/>
                    <FormControl.Feedback />
                  </FormGroup>
                  <Button bsStyle="success" ref='testButton'  onClick={::this.test}>Test</Button>
                  <br/>

                  {resultBlock}

              </div>
              :
              false
            }
          </div>
        </div>
      </div>
    );
  }
}

class Users extends Component {

  componentWillMount() {
    this.props.getUsersAction();
  }

  shouldComponentUpdate(newProps, s1)
  {
    if (newProps.user.updateRequre == true) {
      this.props.getUsersAction();
      return false;
    }

    return true;
  }

  render () {

    return (
      <div id='users'>
        <h1 className='page-header'>Users</h1>
        <div className='row'>
          <LdapBlock {...this.props} />
          <UsersBlock {...this.props} />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      server: state.server,
      user: state.user,
    };
  },

  (dispatch) => bindActionCreators({ getUsersAction, changeUserAvalibleAction, changeUserShowAction, updateUserPasswordAction, deleteUserAction, updateUserRequire, updateUserAdminAction, getLdapSettingAction, setLdapSettingAction, testLdapSettingAction }, dispatch)
)(Users);
