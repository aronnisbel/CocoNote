import React, { Component } from 'react';
 
import Wall from './Wall.jsx';
 
// App component - represents the whole app
// grunden i vår applikation

export default class App extends Component {
 
  

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>
 
        <Wall/>      
        
      </div>
    );
  }
}
