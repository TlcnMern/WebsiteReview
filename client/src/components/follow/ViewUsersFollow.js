import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import man from '../../public/images/man.png';
import { Link } from 'react-router-dom';

import { API_URL } from '../../config/helper';

class ViewUsersFollow extends Component {

    state={
        user:this.props.user
    }
    render() {
        console.log(this.state.user)
        const avatar = this.state.user.avatar;
        var urlAvatar = '';
        if (avatar) {
            if (avatar.includes('dist')) {
                urlAvatar = API_URL + '/' + avatar;
            }
            else {
                urlAvatar = avatar;
            }
        }
        else {
            urlAvatar = man;
        }

        return (
                <Link to={
                    {
                        pathname: `/GuestViewProfile/${this.state.user._id}`
                    }
                }>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={urlAvatar} />
                        </ListItemAvatar>
                        <ListItemText primary={this.state.user.name} />
                    </ListItem>
                </Link>
        );
    }
}

export default ViewUsersFollow;