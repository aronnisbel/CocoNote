import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Notes } from '../api/notes.js';

import Wall from './Wall.jsx';
import NoteContainer from './NoteContainer.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

// App component - represents the whole app
// grunden i vår applikation

class App extends Component {
  constructor(props) {
	super(props);
	this.handleClick = this.handleClick.bind(this);
	this.state = { notescontent: []};
  }
  handleClick(event) {
	event.preventDefault();

	/*// Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();*/
	
	const text = "please add some text here";
	Meteor.call('notes.insert', text);

	// clear form
        /*
	ReactDOM.findDOMNode(this.refs.textInput).value = '';*/
  }

  renderNotes() {
	return this.props.notes.map((note) => (
	  <NoteContainer key={note._id} notetext={note} />
	));
  }
  render() {
    return (
      <div className="container">
        <header>
          <h1>CocoNote!</h1>
	  <AccountsUIWrapper />
	  {this.props.currentUser ?

		  <button type="button" className="new-note" onClick={this.handleClick}>Add note</button> : ''
	  }
        </header>

        <main className="wall-area">

         <Wall notecontent={Notes.find({}).fetch()}/>

     </main>

      </div>
    );
  }
}
App.proptypes = {
  notes: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
	return {
		
		notes: Notes.find({}).fetch(),
		currentUser: Meteor.user(),
	};
}, App);

