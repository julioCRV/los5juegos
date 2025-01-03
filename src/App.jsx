// src/App.jsx
import React from 'react';
import './App.css';
import Login from './components/Login';
// Testing
import Demo from './components/ObservaYRealiza';
// EndTesting

import IniciarSesion from './pages/IniciarSesion';

const App = () => {
  return (
    <div className="App">
      {/* <Login /> */}
      <IniciarSesion />
    </div>
  );
};

export default App;
