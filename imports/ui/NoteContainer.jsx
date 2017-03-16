import React, { Component, PropTypes } from 'react';
import Draggable from 'react-draggable';


import { Notes } from '../api/notes.js';
import TextEdit from './TextEdit.jsx';

export default class NoteContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {showtext: true, showeditor: false}
    this.deletethisNote = this.deletethisNote.bind(this);
    this.updateNoteText = this.updateNoteText.bind(this);
    this.enterEditMode = this.enterEditMode.bind(this);
  }

  deletethisNote() {
    Meteor.call('notes.remove', this.props.notetext._id);
  }

  updateNoteText(textToWrite) {
    Meteor.call('notes.update', this.props.notetext._id, textToWrite);
    
  }

  enterEditMode() {
     this.setState({showtext: false, showeditor: true})
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
	  <button type="button" className="deleteNotebutton" onClick={this.deletethisNote}>&times;</button>
          
		<p >{this.props.notetext.text}</p> 
	  
		<TextEdit temptext={this.props.notetext.text} noteidentity={this.props.notetext._id}/>
        </div>

	</Draggable>);
  }

}
