import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
// import Login from './components/Login/Login';
class App extends Component {
  render() {
    return (
        <div>
          <NavBar />
          {/* <Login/> */}
        </div>
    );
  }
}

export default App;