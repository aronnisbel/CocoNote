import React, {Component, PropTypes} from 'react';
import { Meteor } from  'meteor/meteor';
import classnames from  'classnames';

// Texteditor component - represents a texteditor that the user can use for
//notetaking
export default class TextEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    deleteThisText(){
      Meteor.call('textelements.remove', this.props.TextEdit._id);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('A note was submitted: ' + this.state.value);
        event.preventDefault();
        Meteor.call('textelements.insert', this.state.value);

        //var note = db.TextEdit.find({_id: 1});

        //return this.props.textelements.(this.state.value);
    }

    render() {
        return (
        //<div className="textEdit"> < form onSubmit = {
            <form onSubmit={this.handleSubmit}>
              <textarea name="message" rows="10" cols="30"
                value={this.state.value}
                onChange={this.handleChange}>"The cat was playing in the garden."</textarea>
              <input type = "submit" value = "Submit" />
            </form>

            /* Detta är en mix av textform och todoform:
            <form onSubmit={this.handleSubmit}>
              <textarea name="message" rows="10" cols="30"
                value={this.state.value}
                type="text"
                ref="textInput"
                placeholder="Type to add new note"
                onChange={this.handleChange}>"The cat was playing in the garden."</textarea>
              <input type = "submit" value = "Submit" />
            </form>

            /*This is a comment! from simple todo:*/
              /*<form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                <input
                  type="text"
                  ref="textInput"
                  placeholder="Type to add new tasks"
                />
            </form>*/
        //  {this.props.textedit.text}
        //  </div>


    }
}


TextEdit.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  textedit: PropTypes.object.isRequired,
);
