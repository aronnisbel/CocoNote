import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import {createContainer} from 'meteor/react-meteor-data';

import {Notes} from '../api/Note.js';

import NoteContainer from './NoteContainer.jsx';
import TextEdit from './TextEdit.jsx';
// Wall component - represents a wall component in which notes are shown

export default class Wall extends Component {

  constructor(props) {
   super(props);
   this.state = { noteContainers: [{_id: 1, posx: 300,posy: 300}], nrofnotes: 2};
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleSubmit(event) {
       event.preventDefault();

       // Find the text field via the React ref
       const noteContainer = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

       Meteor.call('tasks.insert', text);

       // Clear form
       ReactDOM.findDOMNode(this.refs.textInput).value = '';
   }

  renderNotecontainers() {
    return this.state.noteContainers.map((notedata) => (
  	<NoteContainer key={notedata._id} notedata={notedata}/>
  	));
  }

  onButtonClick() {
      var xmid = document.documentElement.clientWidth / 2;
      var ymid = document.documentElement.clientHeight / 2;
      console.log(xmid);
	console.log(ymid);
      console.log("Im clicked");
      this.setState({noteContainers: this.state.noteContainers.concat([{_id: this.state.nrofnotes, posx: xmid, posy: ymid}]), nrofnotes: this.state.nrofnotes + 1});
  }


  render() {
    return (
      <div className="wall">
	{ this.renderNotecontainers()}
	<button type="button" className="addnote-button" onClick={this.onButtonClick.bind(this)}>Add note</button>
      </div>
    );
  }
}
App.propTypes = {
    tasks: PropTypes.array.isRequired,
    incompleteCount: PropTypes.number.isRequired,
};

/*export default createContainer(() => {
   Meteor.subscribe('notes');
    return {
        tasks: Notes.find({}, {
            sort: {
                createdAt: -1
            }
        }).fetch(),
        incompleteCount: Notes.find({
            checked: {
                $ne: true
            }
        }).count(),
        currentUser: Meteor.user(),
    };
}, App);*/
