import React, { Component, PropTypes } from 'react';
import Draggable from 'react-draggable';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import { Todolists } from '../api/todolists.js';

import Task from './Task.jsx';

class TodolistContainer extends Component {
  constructor(props) {
    super(props);
    Meteor.subscribe('todotasks', this.props.todo._id);
    this.deletethisTodoList = this.deletethisTodoList.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setEditMode = this.setEditMode.bind(this);
    this.setTopic = this.setTopic.bind(this);
  }

  deletethisTodoList() {
    Meteor.call('todolists.remove', this.props.todo._id);
  }
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    Meteor.call('tasks.insert', text, this.props.todo._id);
    // console.log(" after insert of task" + this.props.todo.id);
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }
  setHeadline(event) {
    const text = ReactDOM.findDOMNode(this.refs.headlineInput).value.trim();
    Meteor.call('tasks.setTopic', this.props.todo._id, text);
    //console.log(" after insert of task" + this.props.todo.id);
    // Clear form
    ReactDOM.findDOMNode(this.refs.headlineInput).value = '';
  }
  renderTasks() {
    var specifictasks = Tasks.find({ todolistId: this.props.todo._id }).fetch()
    return specifictasks.map((task) => (
        <Task
          key={task._id}
          task={task}
        />
    ));
  }
  updatePosition(){
    var matrix = window.getComputedStyle(ReactDOM.findDOMNode(this.refs.todocontainer)).getPropertyValue("transform");
    var numbers = matrix.match(/\d+/g).slice(-2).map(Number);
    Meteor.call('todolists.updatePosition', this.props.todo._id, numbers[0], numbers[1]);
  }

  setEditMode() {

    Meteor.call('todolists.seteditmode', this.props.todo._id);
  }

  setTopic(event) {
    event.preventDefault();
    const topictext = ReactDOM.findDOMNode(this.refs.headlineInput).value.trim();

    Meteor.call('todolists.setTopic', this.props.todo._id , topictext );
  }
  render() {
    return (
        <Draggable
        axis="both"
        grid={[1,1]}
        handle=".todocontainer"
        bounds=".wall"
        cancel= 'textarea'
        defaultPosition={{x: this.props.todo.posX, y: this.props.todo.posY}}
        position={null}
        zIndex={100}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.updatePosition}>
        <div className="todocontainer" ref="todocontainer">

         <button type="button" className="deletenotebutton" onClick={this.deletethisTodoList}>&times;</button>
        { this.props.todo.editmode ?
                <form className="todotopicform" onSubmit={this.setTopic} >
                  <input
                   type="text"
                   ref="headlineInput"
                   placeholder={this.props.todo.topic}/>
                </form>
                :
                <p className="todoTopic" onClick={this.setEditMode}>{this.props.todo.topic}</p>
           
	} 
	<div className="todolisttaskscontainer">
           <form className="new-task" onSubmit={this.handleSubmit} >
             <input
               type="text"
               ref="textInput"
               placeholder="Type to add new task"
              />
           </form>
      
          <ul>
            {this.renderTasks()}
          </ul>
        
        </div>
        </div>
        </Draggable>);
  }

}

TodolistContainer.propTypes = {
  currentUser: PropTypes.object,
};

export default createContainer(() => {

  return {
    
    currentUser: Meteor.user(),
  };
}, TodolistContainer);
