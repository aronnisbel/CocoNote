import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Textelements } from '../api/textelements.js';
import  AccountsUIWrapper  from './AccountsUIWrapper.jsx';
import Wall from './Wall.jsx';
//import Textelements from './Textelements.jsx';


// App component - represents the whole app
// grunden i vår applikation

class App extends Component {

  render() {
    return (
      <div className="container">
        <header>
          <h1>Welcome to CocoNote!</h1>
          <AccountsUIWrapper/>
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
  textelements: PropTypes.isRequired,
};
*/
export default createContainer(() => {
  return {
    textelements: Textelements.find({}).fetch(),
  };
}, App);
