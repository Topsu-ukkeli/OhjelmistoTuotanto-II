import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import { Navbar } from "./components/Navbar";
import { Home } from './components/Home';
import { OmaKirjasto } from './components/oma-kirjasto';
import { Sarjat } from './components/sarjat';
import { Login } from './components/login';
import {Kirjat} from './components/Kirjat';



function App() {

  //tällä muuttujalla viedään tietoa onko kirjauduttu vai ei komponentiltä toiselle
  //jäi vähän kesken mut jotakuinkin tuolleen
  const [kirjauduttuData, setKirjauduttuData] = useState(false);


  return (
    <div className="App">
      <Router>
      <Navbar login={kirjauduttuData} />
        <Switch>
          <Route path="/oma-kirjasto"> <OmaKirjasto/></Route>
          <Route path="/sarjat"><Sarjat /></Route>
          <Route path="/Kirjat"><Kirjat/></Route>
          <Route path="/login"><Login login={setKirjauduttuData} /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
