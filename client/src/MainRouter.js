import React, {Component} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import login from './components/auth/login'
import HeaderTemplate from './components/template/Header';
import BodyTemplate from './components/template/Body';
import post from './components/post/NewPost';
import NewFeed from './components/HomeFeed/NewFeed';
import PrivateRoute from './components/auth/PrivateRoute';
import DetailPost from './components/post/DetailPost';
import GuestViewProfile from './components/guest/GuestViewProfile';
import ViewProfile from './components/user/ViewProfile';

class MainRouter extends Component {
  render() {
    return (<div>
      <BrowserRouter>
        <HeaderTemplate />
        <BodyTemplate/>
        <Switch>
          <Route exact path="/" component={NewFeed}/>
          <Route path="/Login" component={login}/>
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