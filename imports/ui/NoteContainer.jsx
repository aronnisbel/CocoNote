import React, { Component, PropTypes } from 'react';
import Draggable from 'react-draggable';


import { Notes } from '../api/notes.js';
import TextEdit from './TextEdit.jsx';

export default class NoteContainer extends Component {

  deletethisNote() {
    Meteor.call('notes.remove', this.props.notetext._id);
  }

  updatePosition(){
    Meteor.call('notes.updatePosition', this.props.notetext._id, 500;
  }

  render() {
    return (
        <Draggable
	axis="both"
	grid={[1,1]}
        handle=".notecontainer"
	bounds=".wall"
	cancel= 'textarea'
        defaultPosition={{x: this.props.notetext.posX, y: this.props.notetext.posY}}
        position={null}
        zIndex={100}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.updatePosition.bind(this)}>

        <div className="notecontainer">
	  <button type="button" className="deleteNotebutton" onClick={this.deletethisNote.bind(this)}>&times;</button>
          <p>{this.props.notetext.text}</p>
        </div>

	</Draggable>);
  }

}
