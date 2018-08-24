import React, { Component } from 'react';
// import './App.css';
import Routes from './routes';
// import NavBar from './components/NavBar/NavBar';
// import Login from './components/Login/Login';
class App extends Component {
  render() {
    return (
        <div>
          {/* <NavBar /> */}
          {/* <Login/> */}
          <Routes />
        </div>
    );
  }
}

export default App;