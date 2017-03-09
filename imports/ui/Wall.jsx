import React, { Component, PropTypes } from 'react';



import NoteContainer from './NoteContainer.jsx';
// Wall component - represents a wall component in which notes are shown

export default class Wall extends Component {

  constructor(props) {
   super(props);
   this.state = { noteContainers: [{_id: 1, posx: 300,posy: 300}], nrofnotes: 2};
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
