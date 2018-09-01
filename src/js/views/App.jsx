import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { routeCodes } from 'constants/routes';

import NavBar from 'components/global/NavBar';

import Home from 'views/Home';

import 'App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
       <NavBar/>
       <div className='Page'>
          <Switch>
            <Route exact path={ routeCodes.HOME } component={ Home } />
          </Switch>
       </div>
      </div>
    );
  }
}

export default hot(module)(App);