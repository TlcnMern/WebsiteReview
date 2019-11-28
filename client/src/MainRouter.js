import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import login from './components/auth/login'
import HeaderTemplate from './components/template/Header';
import BodyTemplate from './components/template/Body';
import post from './components/post/NewPost';
import HomeFeed from './components/HomeFeed/HomeFeed';
import DetailPost from './components/post/DetailPost';
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
// import PrivateRouteAdmin from './components/auth/PrivateRouteAdmin';
// Admin
import BodyAdminTemplate from './components/template/BodyAdmin';
import PostList from './components/admin/post/PostList';
import UserList from './components/admin/user/UserList';
import Ana from './components/admin/analytics/Ana';

import { connect } from 'react-redux';

class MainRouter extends Component {
  render() {
    return (<div>
      <BrowserRouter>
        <HeaderTemplate />
        {this.props.isBodyAdmin?<BodyAdminTemplate/>:
        <BodyTemplate />
        }
        <Switch>
          <Route exact path="/" component={HomeFeed} />
          <Route exact path="/FilmFeed" component={FilmFeed} />
          <Route exact path="/FoodFeed" component={FoodFeed} />
          <Route exact path="/TravelFeed" component={TripFeed} />
          <Route exact path="/BookFeed" component={BookFeed} />

          <Route path="/Login" component={login} />
          <PrivateRoute path="/ViewProfile" component={ViewProfile} />
          <PrivateRoute path="/NewPost" component={post} />
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
  isBodyAdmin:state.user.isBodyAdmin
});
export default connect(mapStateToProps)(MainRouter);