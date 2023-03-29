import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import { Navbar } from "./components/Navbar";
import { Home } from './components/Home';
import { OmaKirjasto } from './components/oma-kirjasto';
import { Sarjat } from './components/sarjat';
import { Login } from './components/login';
import { Kirjat } from './components/Kirjat';
import { Kirjatlisaus } from './components/Kirjatlisaus';
import { Register } from './components/register';
import {SarjatLisaus} from './components/Sarjalisaus'
import { Admin } from './components/Admin';


function App() {

  //tällä muuttujalla viedään tietoa onko kirjauduttu vai ei komponentiltä toiselle
  //jäi vähän kesken mut jotakuinkin tuolleen
  const [kirjauduttuData, setKirjauduttuData] = useState(false);
  const [UserID, setUserID] = useState();
  const [adminlogged, setAdminlogged] = useState(false);
  const [kirjauduttu, setKirjauduttu] = useState(false);
  
  useEffect(() => {
    const userid =  JSON.parse(localStorage.getItem("user"));
    if(userid)
    {
      setUserID(userid);
    }
  },[])
  return (
    <div className="App">
      <Router>
        <Navbar login={kirjauduttuData} adminlogged={adminlogged} setAdminlogged={setAdminlogged} kirjauduttu={kirjauduttu} setKirjauduttu={setKirjauduttu}/>
        <Switch>
          <Route path="/oma-kirjasto"> <OmaKirjasto UserID={UserID} /></Route>
          <Route path="/KirjaLisaus"><Kirjatlisaus /></Route>
          <Route path="/Sarjalisaus"><SarjatLisaus/></Route>
          <Route path="/sarjat"><Sarjat /></Route>
          <Route path="/Kirjat" ><Kirjat UserID={UserID} /></Route>
          <Route path="/login"><Login login={setKirjauduttuData} setUserID={setUserID} setAdminlogged={setAdminlogged} setKirjauduttu={setKirjauduttu} kirjauduttu={kirjauduttu} /></Route>
          <Route path="/register" ><Register /></Route>
          <Route path="/admin"><Admin /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
