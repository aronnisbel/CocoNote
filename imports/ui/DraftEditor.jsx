import React from 'react';
import ReactDOM from 'react-dom';
import {convertFromRaw, convertToRaw, Editor, EditorState, RichUtils} from 'draft-js';

export default class DraftEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.enterSubmit = this.enterSubmit.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.convertRawContent.bind(this)
    }

    handleKeyCommand(command) {
      const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
      if (newState) {
        this.onChange(newState);
        return 'handled';
      }
      return 'not-handled';
    }

  _onBoldClick() {
     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
   }

  enterSubmit() {
    var contentState = this.state.editorState.getCurrentContent();

    var rawContent = JSON.stringify(convertToRaw(contentState));

    Meteor.call('notes.update', rawContent);
  }

  compareDates() {
  var comparedate = new Date();
  if ((comparedate.getTime() - this.props.datecreated.getTime()) < 3000) {
    return (true);
  }
  else {
    return (false);
  }
  }
  convertRawContent(){
    var rawContent = this.props.notetext;

    var contentState = convertFromRaw(JSON.parse(rawContent));

    var editorState = EditorState.createWithContent(contentState);
  }

  render() {
    return (
      <div><button onClick={this._onBoldClick.bind(this)}>Bold</button>
        <Editor id="noteEditor" name="message" rows="3" cols="30" placeholder={this.convertRawContent }
          handleKeyCommand={this.handleKeyCommand} editorState={this.state.editorState} onChange={this.onChange}
          handleReturn={this.enterSubmit}
          />
        </div>
    );
  }
}
