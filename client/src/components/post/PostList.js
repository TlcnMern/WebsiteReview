import React, {Component}from 'react';
import ViewPost from './ViewPost';

class PostList extends Component{
    render(){
        return(
            <div>
                <h3>NEW FEEDS</h3>
                {this.props.posts.map((item, i) => {
                    return <ViewPost post={item} key={i}/>
                })
                }
            </div>
        );
    }
}
export default PostList;