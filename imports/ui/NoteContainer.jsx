import React, { Component, PropTypes } from 'react';
import Draggable from 'react-draggable';


import TextEdit from './TextEdit.jsx';

export default class NoteContainer extends Component {

  getNotecontent() {

  }

  render() {
    return (
        <Draggable
	axis="both"
	grid={[5,5]}
        handle=".notecontainer"
	bounds=".wall"
        defaultPosition={{x: 0, y: 0}}
        position={null}
        zIndex={100}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>

        <div className="notecontainer">
          <TextEdit/>
        </div>

	</Draggable>);
  }

}
