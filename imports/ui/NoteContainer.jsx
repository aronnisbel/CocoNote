import React, { Component, PropTypes } from 'react';
import Draggable from 'react-draggable';
import ReactDOM from 'react-dom';


import { Notes } from '../api/notes.js';
import DraftEditor from './DraftEditor.jsx';

export default class NoteContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {showtext: true, showeditor: false}
    this.deletethisNote = this.deletethisNote.bind(this);
    this.updateNoteText = this.updateNoteText.bind(this);
    this.enterEditMode = this.enterEditMode.bind(this);
    this.toggleEditor = this.toggleEditor.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  deletethisNote() {
    Meteor.call('notes.remove', this.props.notetext._id);
  }

  updatePosition(){
    var matrix = window.getComputedStyle(ReactDOM.findDOMNode(this.refs.noteainer)).getPropertyValue("transform");
    var numbers = matrix.match(/\d+/g).slice(-2).map(Number);
    Meteor.call('notes.updatePosition', this.props.notetext._id, numbers[0], numbers[1]);
  }

  updateNoteText(textToWrite) {
    Meteor.call('notes.update', this.props.notetext._id, textToWrite);

  }

  enterEditMode() {
     this.setState({showtext: false, showeditor: true})
  }
  toggleEditor() {
    Meteor.call('notes.seteditmode', this.props.notetext._id);
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
        onStop={this.updatePosition}>
        <div className="notecontainer" ref="noteainer">

         <button type="button" className="deletenotebutton" onClick={this.deletethisNote}>&times;</button>
      	{ this.props.notetext.editmode ?
      		 <div className="noteeditorcontainer">
             <DraftEditor
               datecreated={this.props.notetext.createdAt} temptext={this.props.notetext.text} noteidentity={this.props.notetext._id}/></div> : <p onClick={this.toggleEditor}>{this.props.notetext.text}</p>
      	}

        </div>

	     </Draggable>);
  }

}
