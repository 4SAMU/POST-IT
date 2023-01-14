import React, { Component } from 'react';
import './App.css';
import First from './components/Landingpage/First';
import Landing from './components/Landingpage/Landing';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Landing />
        <br></br>
        <First />
      </div>
    );
  }
}

export default App;
