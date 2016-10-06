import { connect } from 'react-redux';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { getServersInfoAction } from '../../actions/server.js';

class Circle extends Component {

  render () {
    var style = 'circle ';
    switch (this.props.status) {
      case 'OK':
        style += 'state_0';
      break;
      case 'WARNING':
        style += 'state_1';
      break;
      case 'CRITICAL':
        style += 'state_2';
      break;
      case 'UNKNOWN':
        style += 'state_3';
      break;
      default:
    }
    return (
      <div className={style}></div>
    );
  }
}

class MonitoringBodyTr extends Component {

  render () {
    var hostLink = this.props.link + 'extinfo.cgi?type=1&host=' + this.props.problem.host;
    var serviceLink = this.props.link + 'extinfo.cgi?type=2&host=' + this.props.problem.host + '&service=' + this.props.problem.service;

    return (
      <tr>
        <td><Circle status={this.props.problem.status} /></td>
        <td><a href={hostLink} target='_blank'>{this.props.problem.host} </a></td>
        <td><a href={serviceLink} target='_blank'>{this.props.problem.service} </a></td>
        <td>{this.props.problem.duration}</td>
        <td>{this.props.problem.information}</td>
      </tr>
    );
  }
}

class MonitoringBodyTbody extends Component {

  render () {
    var _this = this;
    return (
      <tbody>
        {this.props.problems.map(function (row, i) {
          var key = i + '_' + Math.random();
          return <MonitoringBodyTr key={key} problem={row} link={_this.props.link} />;
        })}

      </tbody>
    );
  }
}

class MonitoringBody extends Component {
  render () {
    return (
      <div className="panel-body">
        <table className='table table-hover'>
          <thead>
            <tr>
              <th>#</th>
              <th>Host</th>
              <th>Service</th>
              <th>Duration</th>
              <th>Description</th>
            </tr>
          </thead>
          <MonitoringBodyTbody problems={this.props.server.problems} link={this.props.server.link} />
        </table>
      </div>
    );
  }
}
class MonitoringBodyError extends Component {
  render () {
    return (
      <div className="panel-body">
        <h4 style={{ color: 'red', }}>{this.props.server.status_txt}</h4>
      </div>
    );
  }
}
class MonitoringBodyOk extends Component {
  render () {
    return (
      <div className="panel-body">
        <h4 style={{ color: 'green', }}>Everything ok ;)</h4>
      </div>
    );
  }
}

class CounterElement extends Component {
  render () {
    var style = '';
    var count = '';
    var url = '';
    switch (this.props.type) {
      case 'ok':
        style = 'circle state_0';
        count = this.props.server.counters.service_ok;
        url = this.props.server.link + '/status.cgi?limit=0&host=all&servicestatustypes=2';
      break;
      case 'warning':
        style = 'circle state_1';
        count = this.props.server.counters.service_warning;
        url = this.props.server.link + 'status.cgi?limit=0&host=all&servicestatustypes=4';
      break;
      case 'critical':
        style = 'circle state_2';
        count = this.props.server.counters.service_critical;
        url = this.props.server.link + 'status.cgi?limit=0&host=all&servicestatustypes=16';
      break;
      case 'unknown':
        style = 'circle state_3';
        count = this.props.server.counters.service_unknown;
        url = this.props.server.link + 'status.cgi?limit=0&host=all&servicestatustypes=8';
      break;
      case 'downtime':
        style = 'glyphicon ico-top glyphicon-time';
        count = this.props.server.counters.service_downtime;
        url = this.props.server.link + 'status.cgi?limit=0&host=all';
      break;
      case 'ack':
        style = 'glyphicon ico-top glyphicon-check';
        count = this.props.server.counters.service_ack;
        url = this.props.server.link + 'status.cgi?limit=0&host=all';
      break;
      default:
    }

    var result = count > 0 ? <a href={url} target="_blank">
      <div className={style}></div>
      <span className="badge mr">{count}</span>
    </a> : false;

    return result;
  }
}

class CounterBlock extends Component {
  constructor (props) {
    super(props);
    this.state = {

    };
  }

  render () {
    var link = this.props.server.link + 'status.cgi?limit=0&host=all';
    return (
      <div className="panel-heading">
        <a href={link} target="_blank">
          <Circle status='OK' /> {this.props.server.name} ({this.props.server.server_type})
        </a>
        <span className="st_panel">
          <CounterElement type='ok'  server={this.props.server} />
          <CounterElement type='warning'  server={this.props.server} />
          <CounterElement type='critical'  server={this.props.server} />
          <CounterElement type='unknown'  server={this.props.server} />
          <CounterElement type='downtime'  server={this.props.server} />
          <CounterElement type='ack'  server={this.props.server} />
        </span>
      </div>
    );
  }
}

class CounterBlockError extends Component {
  constructor (props) {
    super(props);
    this.state = {

    };
  }

  render () {
    var link = this.props.server.link + 'status.cgi?limit=0&host=all';
    return (
      <div className="panel-heading">
        <a href={link} target="_blank">
          <Circle status='CRITICAL'/> {this.props.server.name} ({this.props.server.server_type})
        </a>
        <span className="st_panel">
        </span>
      </div>
    );
  }
}


class MonitoringElem extends Component {
  constructor (props) {
    super(props);
    this.state = {

    };
  }

  render () {
    var topBlock;
    var bodyBlock;
    if (this.props.server.status == true) {
      topBlock = <CounterBlock server={this.props.server} />;
      if (this.props.server.problems.length == 0) {
        bodyBlock = <MonitoringBodyOk />;
      } else {
        bodyBlock = <MonitoringBody server={this.props.server} />;
      }
    } else {
      topBlock = <CounterBlockError server={this.props.server} />;
      bodyBlock = <MonitoringBodyError server={this.props.server} />;
    }

    return (
      <div className='tabContent'>
        <div className='col-lg-12'>
          <div className="panel panel-default">
            {topBlock}
            {bodyBlock}
            <div className="panel-footer">
              Update {this.props.server.last_check_time_left} sec. ago
            </div>
          </div>
        </div>
      </div>
    );
  }
}
var glob = 'GLOBAL';
var globalGetTimer;
class Monitoring extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      level: '',
      state: 'focus',
      focusEvent: () => {
        this.setState({ state: 'focus' });
        console.log('focus');
      },

      blurEvent: () => {
        this.setState({ state: 'blur' });
        console.log('blur');
      },

    };
    this.update = this.update.bind(this);
  }

  update() {
    console.log('update()');
    this.props.getServersInfoAction();
    console.log('create new timer');
    globalGetTimer = setTimeout(this.update, 20000);
  }

  componentWillMount() {
    this.update();

    window.addEventListener('blur', this.state.blurEvent);
    window.addEventListener('focus', this.state.focusEvent);
  }

  componentWillReceiveProps(newProps) {
    console.log('reciveProps');
  }

  componentWillUnmount() {
    clearInterval(globalGetTimer);
    globalGetTimer = undefined;
    window.removeEventListener('blur', this.state.blurEvent);
    window.removeEventListener('focus', this.state.focusEvent);
  }

  componentWillReceiveProps(newProps) {
    var notify;
    if (newProps.server.info.stateKey != undefined) {
      if (this.state.key != '' && this.state.key != newProps.server.info.stateKey) {
        notify = true;
        //this.refs.notifySound.play();
      } else {
        notify = false;
      }

      var count = this.countProblems(newProps.server.info.servers);
      this.updateIcon(newProps.server.info.level, count);
      this.setState(
        {
          key: newProps.server.info.stateKey,
          level: newProps.server.info.level,
          notify: notify,
          problemsCount: count,
        }); //, () => { this.notify(); });
    }
  }

  countProblems(list) {
    var c = 0;
    list.map((row, i)=> {
      if (row.problems != undefined ) c += row.problems.length;
      if (row.status == false) c++;
    });
    return c;
  }

  updateIcon (lvl, count) {
    var bgColor;
    switch (lvl) {
      case 1:
        bgColor = '#008000';
      break;
      case 2:
        bgColor = '#FFA500';
      break;
      case 3:
        bgColor = '#ff0000';
      break;
      default:
        bgColor = '#0043ff';
    }

    var canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src = '/ico/no.ico';
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, 16, 16);

      ctx.fillStyle = '#FFFFFF';

      var text;
      if (lvl == 1 && count == 0) {
        ctx.font = 'bold 11px sans-serif';
        ctx.fillText('OK', 0, 12);
      } else {
        if (count < 10) {
          ctx.font = 'bold 15px sans-serif';
          ctx.fillText(count, 4, 14);
        }

        if (count >= 10 && count < 100) {
          ctx.font = 'bold 13px sans-serif';
          ctx.fillText(count, 1, 13);
        }

        if (count >= 100) {
          ctx.font = 'bold 9px sans-serif';
          ctx.fillText(count, 1, 12);
        }
      }

      var icon = document.getElementById('dynamic-favicon');
      icon.setAttribute('href', canvas.toDataURL('image/x-icon'));
    };
  }

  render () {

    document.title = 'Monitoring Page | level:' + this.props.server.info.level;

    return (
      <div>
          <audio ref="notifySound">
            <source src="/sound/horse.ogg" type="audio/ogg" />
            <source src="/sound/horse.mp3" type="audio/mpeg" />
          </audio>
          {this.props.server.info.servers.map(function (row, i) {
            var key = i + '_' + Math.random();
            return <MonitoringElem key={key} server={row} />;
          })}

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

  (dispatch) => bindActionCreators({ getServersInfoAction }, dispatch)
)(Monitoring);
