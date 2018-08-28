import React, { Component } from 'react';
import './App.css';
import RandomNumber from './randomNumber/randomNumber';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>HI!</h1>
        <RandomNumber/>
      </div>
    );
  }
}

export default App;