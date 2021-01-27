import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Home from './views/Home'
import Citylist from './views/Citylist'
import Map from './views/Map'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/' exact render={() => <Redirect to='home'/>}/>
        <Route path='/home' component={Home}/>
        <Route path='/citylist'  component={Citylist}/>
        <Route path='/map'  component={Map}/>
      </Router>
    )
  }
}
