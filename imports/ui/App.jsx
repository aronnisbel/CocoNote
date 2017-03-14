import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import Wall from './Wall.jsx';


// App component - represents the whole app
// grunden i vår applikation

class App extends Component {
  constructor(props) {
   super(props);
 }
  render() {
    return (
      <div className="container">
        <header>
          <h1>CocoNote!</h1>
        </header>

        <main className="wall-area">

	         <Wall/>

	     </main>

      </div>
    );
  }
}
/*
App.propTypes = {
    Wall: PropTypes.array.isRequired,
};
*/
