import React, { Component, PropTypes } from 'react';
import Draggable from 'react-draggable';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

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
	cancel= 'textarea'
        defaultPosition={{x: this.props.notedata.posx, y: this.props.notedata.posy}}
        position={null}
        zIndex={100}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>

        <button className="delete" onClick={this.deleteThisNote.bind(this)}>
                  &times;
                </button>
        <div>
          <TextEdit/>
        </div>

	</Draggable>);
  }

}
