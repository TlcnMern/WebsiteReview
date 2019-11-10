import React, {Component}from 'react';
import ViewPost from './ViewPost';

class PostList extends Component{
    render(){
        return(
            <div className="row">
                {this.props.posts? this.props.posts.map((item, i) => {
                    return <ViewPost post={item} key={i}/>
                }): <div></div>
                }
            </div>
        );
    }
}
export default PostList;