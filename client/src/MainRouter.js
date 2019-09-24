import React, {Component} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/pages/home.js'
import login from './components/auth/login'
import HeaderTemplate from './components/template/header';
import Register from './components/user/register';
import profile from './components/user/profile';

class MainRouter extends Component {
  render() {
    return (<div>
      <BrowserRouter>
        <HeaderTemplate />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={login}/>
          <Route exact path="/register" component={Register}/>
          <Route path="/profile" component={profile}/>
        </Switch>
      </BrowserRouter>
    </div>)
  }
}

export default MainRouter
