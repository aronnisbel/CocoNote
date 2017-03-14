import React, { Component, PropTypes } from 'react';



import NoteContainer from './NoteContainer.jsx';
// Wall component - represents a wall component in which notes are shown

export default class Wall extends Component {



  renderNotecontainers() {

    return <NoteContainer/>
  }

  render() {
    return (
      <div className="wall">
	{ this.renderNotecontainers()}
      </div>
    );
  }
}
