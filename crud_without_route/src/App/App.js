import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import AllEmployees from './components/AllEmployees/AllEmployees';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <AllEmployees/>
      </div>
        
    );
  }
}

export default App;