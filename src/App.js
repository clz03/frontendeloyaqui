import React from 'react';
import "./App.css";
import Routes from './routes';
import logo from "./assets/logo.png";

function App() {

  return (
    <div className="container">
      <img src={logo} alt="EloyAqui" width="400px"></img>
        <Routes />
    </div>
  );
}

export default App;