import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//common
import login from './components/auth/login';
import Header from './components/template/Header';
import Body from './components/template/Body';
//post
import NewPost from './components/post/NewPost';
import AllFeed from './components/HomeFeed/AllFeed';
import HomeFeed from './components/HomeFeed/HomeFeed';
import DetailPost from './components/post/DetailPost';
//user
import GuestViewProfile from './components/guest/GuestViewProfile';
import ViewProfile from './components/user/ViewProfile';
//sort-search
import SearchPage from './components/search/SearchPage';
import FilmFeed from './components/sortTheme/FilmFeed';
import FoodFeed from './components/sortTheme/FoodFeed';
import TripFeed from './components/sortTheme/TripFeed';
import BookFeed from './components/sortTheme/BookFeed';
//PrivateRoute
import PrivateRoute from './components/auth/PrivateRoute';
// Admin
import BodyAdmin from './components/template/BodyAdmin';
import PostList from './components/admin/post/PostList';
import UserList from './components/admin/user/UserList';
import Ana from './components/admin/analytics/Ana';
import HeaderAdmin from './components/template/HeaderAdmin';

import { connect } from 'react-redux';

class MainRouter extends Component {
  render() {
    return (<div>
      <BrowserRouter>
        {this.props.isBodyAdmin ? [<HeaderAdmin key={1} />, <BodyAdmin key={2} />] :
          [<Header key={3} />, <Body key={4} />]
        }
        <Switch>
          <Route exact path="/" component={HomeFeed} />
          <Route exact path="/AllFeed" component={AllFeed} />
          <Route exact path="/FilmFeed" component={FilmFeed} />
          <Route exact path="/FoodFeed" component={FoodFeed} />
          <Route exact path="/TravelFeed" component={TripFeed} />
          <Route exact path="/BookFeed" component={BookFeed} />

          <Route path="/Login" component={login} />
          <PrivateRoute path="/ViewProfile" component={ViewProfile} />
          <PrivateRoute path="/NewPost" component={NewPost} />
          <Route path="/DetailPost/:postId" component={DetailPost} />
          <Route path="/GuestViewProfile/:userId" component={GuestViewProfile} />
          <Route exact path="/Search" component={SearchPage} />

          <Route exact path="/Admin" component={PostList} />
          <Route path="/Admin/QLUser" component={UserList} />
          <Route path="/Admin/Analytics" component={Ana} />
        </Switch>
      </BrowserRouter>
    </div>)
    // }
  }
}
const mapStateToProps = state => ({
  isAuthenticatedAdmin: state.auth.isAuthenticatedAdmin,
  isBodyAdmin: state.user.isBodyAdmin
});
export default connect(mapStateToProps)(MainRouter);