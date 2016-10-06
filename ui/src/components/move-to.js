import React, { Component } from 'react';
import { browserHistory } from 'react-router';

export class MoveTo extends Component {

  make() {
    if (this.props.if === true || this.props.if === undefined) browserHistory.push(this.props.to);
  }

  componentDidUpdate() {
    this.make();
  }

  componentDidMount() {
    this.make();
  }

  render() {
    return (
      <div></div>
    );
  }

};
