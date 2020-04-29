import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Components/Home'
import Welcome from './Components/Welcome'
import Login from './Components/Login'
import Signup from './Components/Signup'

class App extends Component {

  render () {
    return (
      <div>
        <BrowserRouter> 
          <Route exact path = "/" component = {Welcome} />
          <Route path = "/login" component = {Login} />
          <Route path = "/signup" component = {Signup} />
          <Route path = "/home" component = {Home} />
        </BrowserRouter>

      </div>
    )
  }
}

export default App;
