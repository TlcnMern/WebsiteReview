import React, {Component} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import login from './components/auth/login'
import HeaderTemplate from './components/template/header';
import Register from './components/user/register';
import profile from './components/user/profile';
import post from './components/post/NewPost';
import NewFeeds from './components/post/NewFeeds';

class MainRouter extends Component {
  render() {
    return (<div>
      <BrowserRouter>
        <HeaderTemplate />
        <Switch>
          <Route exact path="/" component={NewFeeds}/>
          <Route exact path="/login" component={login}/>
          <Route exact path="/register" component={Register}/>
          <Route path="/profile" component={profile}/>
          <Route path="/NewPost" component={post}/>
        </Switch>
      </BrowserRouter>
    </div>)
  }
}

export default MainRouter
