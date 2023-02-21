import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import { Navbar } from "./components/Navbar";
import { Home } from './components/Home';
import { OmaKirjasto } from './components/oma-kirjasto';
import { Sarjat } from './components/sarjat';
import { Login } from './components/login';



function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/oma-kirjasto"> <OmaKirjasto/></Route>
          <Route path="/sarjat"><Sarjat /></Route>
          <Route path="/login"><Login /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
