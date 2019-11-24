import React, {Component}from 'react';
import TopUser from './Top10-User';

class UserList extends Component{
    render(){
        return(
            <div className="row">
                {/* {this.props.posts? this.props.posts.map((item, i) => {
                    return <ViewPost post={item} key={i}/>
                }): <div></div>
                } */}
                <TopUser/>
                <TopUser/>
                <TopUser/>
            </div>
        );
    }
}
export default UserList;