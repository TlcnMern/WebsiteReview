import React, {Component} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import login from './components/auth/login'
import HeaderTemplate from './components/template/header';
import BodyTemplate from './components/template/body';
import Register from './components/user/register';
import profile from './components/user/profile';
import post from './components/post/NewPost';
import HomeFeeds from './components/feed/HomeFeed';
import PrivateRoute from './components/auth/PrivateRoute';
import DetailPost from './components/post/DetailPost';
import GuestViewProfile from './components/guest/GuestViewProfile';
import ViewProfile from './components/profile/viewProfile';

class MainRouter extends Component {
  render() {
    return (<div>
      <BrowserRouter>
        <HeaderTemplate />
        <BodyTemplate/>
        <Switch>
          <Route exact path="/" component={HomeFeeds}/>
          <Route path="/Login" component={login}/>
          <Route path="/Register" component={Register}/>
          <PrivateRoute path="/Profile" component={profile}/>
          <PrivateRoute path="/ViewProfile" component={ViewProfile}/>
          <PrivateRoute path="/NewPost" component={post}/>
          <Route path="/DetailPost/:postId" component={DetailPost}/>
          <Route path="/GuestViewProfile/:userId" component={GuestViewProfile}/>
        </Switch>
      </BrowserRouter>
    </div>)
  }
}

export default MainRouter