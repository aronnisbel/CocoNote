import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Notes } from '../api/notes.js';
import { Tasks } from '../api/tasks.js';
import { Todos } from '../api/todolists.js';


import Task from './Task.jsx';
import NoteContainer from './NoteContainer.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import TodolistContainer from './TodolistContainer.jsx';

// App component - represents the whole app
// grunden i vår applikation

class App extends Component {
  constructor(props) {
	super(props);
	this.handleClick = this.handleClick.bind(this);
	this.state = { notescontent: []};
	this.addTodoList = this.addTodoList.bind(this);
	this.renderTodos = this.renderTodos.bind(this);
	this.setbackground = this.setbackground.bind(this);
	this.showdropdownoptions = this.showdropdownoptions.bind(this);
  }

  renderNoteContents() {
    return this.props.notes.map((note) => (
      <NoteContainer key ={note._id} notetext={note} />
    ));
  }

  /*add new note*/
  handleClick(event) {
	event.preventDefault();

        const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();*/
	
	const text = "";
	Meteor.call('notes.insert', text);

  }

  /* Add new todolist */
  addTodoList(event) {
    event.preventDefault();

    const todotext = "coconote";
    Meteor.call('todolists.insert', todotext);
    
  }
  /*Render todolists in Containers*/
  renderTodos() {
    return this.props.todolists.map((todolist) => (
      <TodolistContainer key ={todolist._id} todolistowner={todolist.owner} todo={todolist}/>
    ));
  }

  renderonwallclick(event) {
    event.preventDefault();
    if (event.target.id == "wallcanvas") {

      var xxpos = event.clientX;
      var yypos = event.clientY - 70;
      const text = "";
      Meteor.call('notes.insertpos', text, xxpos, yypos );
      //Meteor.call('notes.insertwithpos', text, event.target.clientX, event.target.clientY);
    }
  }


  showdropdownoptions() {
   // document.getElementById("themeDropdown").style.display = "block";
   document.body.style.background = "white";
  }

  setbackground(background) {
    
    document.body.style.backgroundImage = background;
   // document.getElementById("themeDropdown").style.display = "none";
    
  // document.getElementById("dropbtn").style.backgroundImage = background;
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>CocoNote!</h1>
	  <h3 id="userlogintext"> User: </h3>
	  <AccountsUIWrapper />
	  {this.props.currentUser ?

		  <div className="buttonscontainer">
			<button type="button" className="new-note" onClick={this.handleClick}>Add note</button>
			<button type="button" className="new-todo" onClick={this.addTodoList}>Add Todo-list</button>
		  </div> : ''
	  }

	 <div className="themedropdowncontainer">
  		<button onClick={this.showdropdownoptions} id="dropbtn">Choose background color</button>
	</div>
        </header>

        <main id="wallcanvas"className="wall-area wall" onClick={this.renderonwallclick.bind(this)}>

         {this.renderNoteContents()}
	 {this.renderTodos()}


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
	Meteor.subscribe('tasks');
	Meteor.subscribe('usertodos');
	return {
		todolists: Todos.find({}).fetch(),
		tasks: Tasks.find({}).fetch(),
		notes: Notes.find({}).fetch(),
		currentUser: Meteor.user(),
	};
}, App);

