import React from 'react';
import './App.css';
import { HashRouter as Router} from "react-router-dom"//this imports the router dom to be used to route the components on the page
import Home from './components/Home'
import MusicBook from './components/MusicBook'
import Favorite from './components/Favorite'

class App extends React.Component {
  render(){
    return (
      <Router >
        <Home/>
        <div>
          <div>
            <br/>
            <MusicBook/>
            <hr/>
            <Favorite/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
