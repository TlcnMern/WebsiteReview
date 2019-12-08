import React, {Component}from 'react';
import ViewPost from './QLPost_VUViewPost';

class PostList extends Component{
    render(){
        return(
            <div className="row">
                {/* {this.props.posts? this.props.posts.map((item, i) => {
                    return <ViewPost post={item} key={i}/>
                }): <div></div>
                } */}
                <ViewPost/>
                <ViewPost/>
                <ViewPost/>
            </div>
        );
    }
}
export default PostList;