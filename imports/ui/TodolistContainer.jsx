import React, { Component, PropTypes } from 'react';
import Draggable from 'react-draggable';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import { Todolists } from '../api/todolists.js';

class TodolistContainer extends Component {
  constructor(props) {
    super(props);
    Meteor.subscribe('todotasks', this.props.todo._id);
    this.deletethisTodoList = this.deletethisTodoList.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  deletethisTodoList() {
    Meteor.call('todolists.remove', this.props.todo._id);
  }
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text, this.props.key);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderTasks() {

    return this.props.tasks.map((task) => (
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

  render() {
    return (
        <Draggable
        axis="both"
        grid={[1,1]}
        handle=".notecontainer"
        bounds=".wall"
        cancel= 'textarea'
        defaultPosition={{x: this.props.todo.posY, y: this.props.todo.posY}}
        position={null}
        zIndex={100}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.updatePosition}>
        <div className="todolistcontainer" ref="todocontainer">

         <button type="button" className="deletenotebutton" onClick={this.deletethisTodoList}>&times;</button>
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
  tasks: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, TodolistContainer);
