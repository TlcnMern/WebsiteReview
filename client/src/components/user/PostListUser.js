import React, {Component}from 'react';
import ViewPostUser from './ViewPostUser';

class PostListUser extends Component{
    render(){
        return(
            <div className="row" style={{padding:'5px'}}>
                {this.props.postsUser? this.props.postsUser.map((item, i) => {
                    return <ViewPostUser post={item} key={i}/>
                }): <div></div>
                }
            </div>
        );
    }
}
export default PostListUser;