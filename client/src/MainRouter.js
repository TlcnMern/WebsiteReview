import React, {Component} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import login from './components/auth/login'
import HeaderTemplate from './components/template/header';
import Register from './components/user/register';
import profile from './components/user/profile';
import post from './components/post/NewPost';
import NewFeeds from './components/post/NewFeeds';
import PrivateRoute from './components/auth/PrivateRoute';
import DetailPost from './components/post/DetailPost';
import GuestViewProfile from './components/guest/GuestViewProfile';

class MainRouter extends Component {
  render() {
    return (<div>
      <BrowserRouter>
        <HeaderTemplate />
        <Switch>
          <Route exact path="/" component={NewFeeds}/>
          <Route exact path="/Login" component={login}/>
          <Route exact path="/Register" component={Register}/>
          <PrivateRoute path="/Profile" component={profile}/>
          <PrivateRoute path="/NewPost" component={post}/>
          <Route path="/DetailPost" component={DetailPost}/>
          <Route path="/GuestViewProfile" component={GuestViewProfile}/>
        </Switch>
      </BrowserRouter>
    </div>)
  }
}

export default MainRouter
