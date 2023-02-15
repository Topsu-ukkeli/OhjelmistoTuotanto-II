import React from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';
import { Navbar } from "./components/Navbar";
import { Home } from './components/Home';
import { OmaKirjasto } from './components/oma-kirjasto';




function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/"><Home /></Route>
          <Route path="/oma-kirjasto"> <OmaKirjasto/></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
