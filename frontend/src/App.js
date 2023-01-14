import React, { Component } from 'react';
import './App.css';
import First from './components/First';
import Landing from './components/Landing';

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
