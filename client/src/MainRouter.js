import React, {Component} from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import login from './components/auth/login'
import HeaderTemplate from './components/template/Header';
import BodyTemplate from './components/template/Body';
import post from './components/post/NewPost';
import HomeFeed from './components/HomeFeed/HomeFeed';
import PrivateRoute from './components/auth/PrivateRoute';
import DetailPost from './components/post/DetailPost';
import GuestViewProfile from './components/guest/GuestViewProfile';
import ViewProfile from './components/user/ViewProfile';
import SearchPage from './components/search/SearchPage';
import FilmFeed from './components/sortTheme/FilmFeed';
import FoodFeed from './components/sortTheme/FoodFeed';
import TripFeed from './components/sortTheme/TripFeed';
import BookFeed from './components/sortTheme/BookFeed';

class MainRouter extends Component {
  render() {
    return (<div>
      <BrowserRouter>
        <HeaderTemplate />
        <BodyTemplate/>
        <Switch>
          <Route exact path="/" component={HomeFeed}/>
          <Route exact path="/FilmFeed" component={FilmFeed}/>
          <Route exact path="/FoodFeed" component={FoodFeed}/>
          <Route exact path="/TravelFeed" component={TripFeed}/>
          <Route exact path="/BookFeed" component={BookFeed}/>
          
          <Route path="/Login" component={login}/>
          <PrivateRoute path="/ViewProfile" component={ViewProfile}/>
          <PrivateRoute path="/NewPost" component={post}/>
          <Route path="/DetailPost/:postId" component={DetailPost}/>
          <Route path="/GuestViewProfile/:userId" component={GuestViewProfile}/>
          <Route exact path="/Search" component={SearchPage}/>
        </Switch>
      </BrowserRouter>
    </div>)
  }
}

export default MainRouter