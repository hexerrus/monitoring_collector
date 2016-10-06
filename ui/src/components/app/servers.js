import { connect } from 'react-redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import FormControl from 'react-bootstrap/lib/FormControl';
import { getAllServersAction, updateServerAction, createServerAction, deleteServerAction } from '../../actions/server.js';

class EditForm extends Component {

  constructor (props) {
    super(props);
    this.state = {
      server: this.props.server,
      serverNewDate: this.props.server,
      validate: {
        interval: null,
        name: null,
        link: null,
      },
    };

    this.changeName = this.changeName.bind(this);
    this.changeUri = this.changeUri.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeInterval = this.changeInterval.bind(this);
    this.flush = this.flush.bind(this);
    this.checkName = this.checkName.bind(this);
    this.checkUri = this.checkUri.bind(this);
    this.checkInterval = this.checkInterval.bind(this);
  }


  changeName(e) {
    this.validator();
    this.setState({ serverNewDate: Object.assign(this.state.serverNewDate, { name: e.target.value, }), });
  }

  changeUri(e) {
    this.validator();
    this.setState({ serverNewDate: Object.assign(this.state.serverNewDate, { link: e.target.value, }), });
  }

  changeUsername(e) {

    this.setState({ serverNewDate: Object.assign(this.state.serverNewDate, { username: e.target.value, }), });
  }

  changePassword(e) {
    this.setState({ serverNewDate: Object.assign(this.state.serverNewDate, { password: e.target.value, }), });
  }

  changeInterval(e) {
    this.validator();
    this.setState({ serverNewDate: Object.assign(this.state.serverNewDate, { interval: e.target.value, }), });

  }

  checkUri() {
    var val = ReactDOM.findDOMNode(this.refs.link).value;
    var reg = /^https?:\/\/.*\/$/i;

    var valState = (val.match(reg) == null) ? 'error' : 'success';

    return valState;
  }

  checkName() {
    var val = ReactDOM.findDOMNode(this.refs.name).value;
    var valState = (val.length < 3 || val.length > 200) ? 'error' : 'success';
    return valState;
  }

  checkInterval() {
    var interval = ReactDOM.findDOMNode(this.refs.interval).value;
    if (interval != parseInt(interval)) {
      var setValue = this.state.serverNewDate.interval; //parseInt(interval);
      ReactDOM.findDOMNode(this.refs.interval).value = setValue;
    } else {

      var intervalState = (interval > 3600 || interval < 10) ? 'error' : 'success';
      return intervalState;
    }
  }

  componentDidMount() {
    this.validator();
    if (this.props.flush) this.flush();
  }

  validator() {
    var newState = {
      name: this.checkName(),
      link: this.checkUri(),
      interval: this.checkInterval(),
    };
    var valid =  (newState.name == 'success' && newState.link == 'success'  && newState.interval == 'success') ? true : false;
    this.setState({ validate: newState, isValide: valid });
    this.props.cb(valid);
  }

  flush() {
    ReactDOM.findDOMNode(this.refs.name).value = '';
    ReactDOM.findDOMNode(this.refs.link).value = '';
    ReactDOM.findDOMNode(this.refs.username).value = '';
    ReactDOM.findDOMNode(this.refs.password).value = '';
  }

  render () { //validationState
    return (
      <div>
        <FormGroup validationState={this.state.validate.name}>
          <ControlLabel>Name</ControlLabel>
          <FormControl ref='name' onChange={this.changeName} type="text" defaultValue={this.state.server.name} placeholder="Server name"/>
          <FormControl.Feedback />
          <HelpBlock>example: My server</HelpBlock>
        </FormGroup>

        <FormGroup validationState={this.state.validate.link}>
          <ControlLabel>Nagios uri</ControlLabel>
          <FormControl ref='link' onChange={this.changeUri} type="text" defaultValue={this.state.server.link} placeholder="http://nagios/path/to/cgi/directory/"/>
          <FormControl.Feedback />
          <HelpBlock>example: http://nagios.com/nagios3/cgi-bin/</HelpBlock>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Username</ControlLabel>
          <FormControl ref='username' onChange={this.changeUsername} type="text" defaultValue={this.state.server.username} placeholder="auth login"/>
          <FormControl.Feedback />
          <HelpBlock>example: admin</HelpBlock>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl ref='password' onChange={this.changePassword} type="text" defaultValue={this.state.server.password} placeholder="Password"/>
          <FormControl.Feedback />
          <HelpBlock>example: passWord</HelpBlock>
        </FormGroup>

        <FormGroup validationState={this.state.validate.interval} >
          <ControlLabel>Interval</ControlLabel>
          <FormControl ref='interval' onChange={this.changeInterval.bind(this)} type="text" defaultValue={this.state.server.interval} placeholder="interval"/>
          <FormControl.Feedback />
          <HelpBlock>inverval for update data from server, value beetween 10 and 3600</HelpBlock>
        </FormGroup>


      </div>
    );
  }
}

class ModalNew extends Component {

  constructor (props) {
    super(props);
    var defaultServer = {
      name: '',
      link: '',
      server_type: 'nagios',
      username: '',
      password: '',
      interval: 60,
    };
    this.state = {
      showModal: false,
      server: defaultServer,
    };
    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
    this.cb = this.cb.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ showModal: nextProps.show });
  }

  close() {
    this.setState({ showModal: false });
  }

  save() {
    this.props.createServerAction(this.refs.EditFormRef.state.serverNewDate);
    this.setState({ showModal: false });
  }

  cb(valid) {

    this.setState({ valid: valid });
  }

  render () {
    return (
      <div className="static-modal">
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>New server</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditForm server={this.state.server} ref='EditFormRef' cb={::this.cb} flush={true} />
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="success" disabled={!this.state.valid} onClick={this.save}>Save</Button>
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
      server: this.props.server,
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
    this.props.deleteServerAction(this.state.server);
    this.setState({ showModal: false });
  }

  render () {
    return (
      <div className="static-modal">
        <Modal show={this.state.showModal} onHide={this.close}>
                  <Modal.Header closeButton>
                    <Modal.Title>Delete server</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div><b>Please confirm</b></div>
                    <div>Server:{this.state.server.name}</div>
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

class ModalEdit extends Component {

  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
      server: this.props.server,
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
    this.props.updateServerAction(this.refs.EditFormRef.state.serverNewDate);
    this.setState({ showModal: false });
  }

  cb(valid) {

    this.setState({ valid: valid });
  }

  render () {
    return (
      <div className="static-modal">
        <Modal show={this.state.showModal} onHide={this.close}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit server</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <EditForm server={this.state.server} ref='EditFormRef' cb={::this.cb} />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button bsStyle="success" disabled={!this.state.valid}  onClick={this.save}>Save</Button>
                    <Button onClick={this.close}>Close</Button>
                  </Modal.Footer>
                </Modal>
      </div>
    );
  }
}

class StatusLine extends Component {
  constructor(props) {
    super(props);
    var circleStyle = (this.props.server.status) ? 'state_0' : 'state_2';
    this.state = {
      circleStyle: circleStyle + ' circle',
    };
  }

  render () {
  //  console.warn('this.props.server.status_txt:' , this.props.server.status_txt);
    return (
      <b><div className={this.state.circleStyle}></div> {this.props.server.status_txt}</b>
    );
  }
}

class ServerTr extends Component {

  constructor(props) {
    super(props);
    var ss = {
      name: 'my server',
      link: 'http://magios.com/nagios4/cgi-bin/',
      server_type: 'nagios',
      username: 'admin',
      password: 'admin',
      interval: 60,
      status: 'OK',
    };

    this.state = {
      showEdit: false,
      server: this.props.server || ss,
    };
    this.showEdit = this.showEdit.bind(this);
    this.showDelete = this.showDelete.bind(this);
  }

  showEdit() {
    this.refs.editModalWindow.setState({ showModal: true });
  }

  showDelete() {
    this.refs.deleteModalWindow.setState({ showModal: true });
  }

  render () {
    //console.log('rebuild_@', this.state.server.status_txt);
    var status;
    if (this.state.server.status) {
      status = <b><div className='circle state_0'></div> OK</b>;
    } else {
      status = <b><div className='circle state_2'></div> {this.state.server.status_txt}</b>;
    }

    return (
      <tr>
        <td>{this.state.server.name} ({this.state.server.server_type})</td>
        <td>{this.state.server.link}</td>
        <td>{this.state.server.username}</td>
        <td>{this.state.server.interval}</td>
        <td><StatusLine server={this.state.server}/></td>
        <td className="btn_block">
          {/*<button type="button" className="btn btn-success">
            <span className='glyphicon glyphicon-refresh'></span>
          </button>*/}
          <button type="button" className="btn btn-warning" onClick={this.showEdit}>
            <span className='glyphicon glyphicon-edit'></span>
          </button>
          <button type="button" className="btn btn-danger" onClick={this.showDelete}>
            <span className='glyphicon glyphicon-trash'></span>
          </button>
          <ModalEdit ref='editModalWindow' server={this.state.server} updateServerAction={this.props.updateServerAction}/>
          <ModalDelete ref='deleteModalWindow' server={this.state.server} deleteServerAction={this.props.deleteServerAction}/>

        </td>
      </tr>
    );
  }
}

class Servers extends Component {
  constructor(props) {
    super(props);
    this.refresh = this.refresh.bind(this);
    this.newServer = this.newServer.bind(this);
  }

  componentWillMount() {
    this.props.getAllServersAction();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.server.updateRequre == true) {
      this.props.getAllServersAction();
    }
  }

  refresh () {
    this.props.getAllServersAction();
  }

  newServer() {
    this.refs.newServerWindow.setState({ showModal: true });
  }

  render () {
    var _this = this;
    return (
      <div id='servers'>
        <h1>Servers</h1>
        <div id='topButtons'>
          <button type="button" className="btn btn-default" onClick={this.refresh}>
            <span className='glyphicon glyphicon-refresh'> </span> Refresh
          </button>

          <button type="button" className="btn btn-success" onClick={this.newServer}>
            <span className='glyphicon glyphicon-edit'> </span> Add new server
          </button>
          <ModalNew ref='newServerWindow' createServerAction={this.props.createServerAction}/>
        </div>
          <table className="table table-bordered table-hover">
            <tbody>
              <tr>
                <td><b>Name (Type)</b></td>
                <td><b>Uri</b></td>
                <td><b>Login</b></td>
                <td><b>Interval</b></td>
                <td><b>Status</b></td>
                <td></td>
              </tr>
              {this.props.server.all.map(function (row, i) {
                var key = i + '_' + Math.random();
                return <ServerTr key={key} server={row} updateServerAction={_this.props.updateServerAction}
                  deleteServerAction={_this.props.deleteServerAction}  />;
              })}

            </tbody>
          </table>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      server: state.server,
    };
  },

  (dispatch) => bindActionCreators({ getAllServersAction, updateServerAction, createServerAction, deleteServerAction }, dispatch)
)(Servers);
