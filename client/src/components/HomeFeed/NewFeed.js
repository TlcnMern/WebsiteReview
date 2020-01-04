import React, { Component } from 'react';
import PostList from '../post/PostList';
import { GetNewFeeds } from '../../action/postAction';
import Loading from '../template/Loading';
import { auth } from '../../config/helper';
class NewFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postList: []
    };
  }

  componentDidMount() {
    var userId = null;
    var jwt = auth.isAuthenticated();
    if (jwt) {
      userId = jwt.user._id;
    }
    GetNewFeeds(userId).then((data) => {
      if (data.error)
        console.log(data.error);
      else {
        if (data.length > 0)
          this.setState({ postList: data })
        window.scrollTo(0, 0)
        this.props.onCallBack();
      }

    });
  }

  render() {
    if (!this.state.postList) {
      return <Loading />
    }
    return (
      <PostList posts={this.state.postList} />
    );

  }
}
export default NewFeed;