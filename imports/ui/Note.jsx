import React, { Component, PropTypes } from 'react';
 
// Note component - represents a single text note item
export default class Note extends Component {
  deleteThisTask() {
    Meteor.call('notes.remove', this.props.note._id);
  }
  render() {
    return (
      <li>{this.props.note.text}</li>
    );
  }
}
 
Note.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  note: PropTypes.object.isRequired,
};
