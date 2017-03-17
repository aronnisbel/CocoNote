import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

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

  renderNoteContents() {
    return this.props.notes.map((note) => (
      <NoteContainer key ={note._id} notetext={note} />
    ));
  }


  handleClick(event) {
	event.preventDefault();

	/*// Find the text field via the React ref
        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();*/

	const text = "";
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
  renderonwallclick(event) {
    event.preventDefault();
    if (event.target.id == "wallcanvas") {

      var xxpos = event.clientX;
      var yypos = event.clientY - 70;
	console.log(event.clientX);
	console.log(event.clientY);
      const text = "";
      Meteor.call('notes.insertpos', text, xxpos, yypos );
      //Meteor.call('notes.insertwithpos', text, event.target.clientX, event.target.clientY);
    }
  }
  render() {
    return (
      <div className="container">
        <header>
          <h1>CocoNote!</h1>
	  <h3 id="userlogintext"> User: </h3>
	  <AccountsUIWrapper />
	  {this.props.currentUser ?

		  <button type="button" className="new-note" onClick={this.handleClick}>Add note</button> : ''
	  }
        </header>

        <main id="wallcanvas"className="wall-area wall" onClick={this.renderonwallclick.bind(this)}>

         {this.renderNoteContents()}

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
	Meteor.subscribe('usernotes');
	return {

		notes: Notes.find({}).fetch(),
		currentUser: Meteor.user(),
	};
}, App);
