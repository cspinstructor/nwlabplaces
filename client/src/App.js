import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
      </div>
    );
  }
}

export default App;
