import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Navbar } from "./components/Navbar";
import { Projects } from './components/Projects';
import { Home } from './components/Home';



function App() {
  return (
    <div className="App">
    <Router>
      <Navbar />
        <Switch>
          <Route path="/projects" component={Projects} />
          <Route path="/" component={Home} />
        </Switch>
    </Router>
  </div>
  );
}

export default App;
