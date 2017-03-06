import React, { Component, PropTypes } from 'react';

import TextEdit from './TextEdit.jsx';
// Wall component - represents a wall component in which notes are shown

export default class Wall extends Component {

  renderNotecontainers() {

  }

  render() {
    return (
      <div className="wall">
        <TextEdit/>
      </div>
    );
  }
}
