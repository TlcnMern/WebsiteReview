import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../public/stylesheets/partials/style.css"
import PostList from '../post/PostList';
import { GetNewFeeds } from '../../action/postAction';
import Loading from '../template/Loading';
class NewFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: []
    };
    GetNewFeeds().then((data) => {
      if (data.error)
        console.log(data.error);
      else {
        if (data.length > 0)
          this.setState({ postList: data })
      }
    });
  }
  
  render() {
    if(!this.state.postList){
      return <Loading/>
    }
    return (
      <PostList posts={this.state.postList} />
    );

  }
}



export default NewFeed;