import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ViewUsersFollow from './ViewUsersFollow';

class FollowUser extends Component {
    render() {
        if(this.props.users.length>0){
            return (
                <List>
                    {this.props.users.map((user,i) => (
                        <div className="row" key={user._id}>
                            <ViewUsersFollow  user={user}/>
                        </div>
                    ))}
                </List>
            );
        }
        else{
            return <div></div>
        }

    }
}

export default FollowUser;