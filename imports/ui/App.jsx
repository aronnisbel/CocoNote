import React, { Component } from 'react';
 
import Wall from './Wall.jsx';
 
// App component - represents the whole app
// grunden i vår applikation

export default class App extends Component {
 
  renderWallarea(){
    return <Wall/>
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>CocoNote!</h1>
        </header>
 
        <main className="wall-area">

	
	 {this.renderWallarea()}
	</main>   
        
      </div>
    );
  }
}
