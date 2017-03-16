import React, { Component, PropTypes } from 'react';
import Draggable from 'react-draggable';
import { createContainer } from 'meteor/react-meteor-data';

import { Textelement} from '../api/textelements.js';

import { Notes } from '../api/notes.js';
import TextEdit from './TextEdit.jsx';

export default class NoteContainer extends Component {

  deletethisNote() {
    Meteor.call('notes.remove', this.props.notetext._id);
  }

  render() {
    return (
        <Draggable
	axis="both"
	grid={[5,5]}
        handle=".notecontainer"
	bounds=".wall"
	cancel= 'textarea'
        defaultPosition={{x: this.props.notetext.posX, y: this.props.notetext.posY}}
        position={null}
        zIndex={100}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>

        <div className="notecontainer">
	  <button type="button" className="deleteNotebutton" onClick={this.deletethisNote.bind(this)}>&times;</button>
          <p>{this.props.notetext.text}</p>
        </div>

	</Draggable>);
  }

}
