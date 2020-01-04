import React, { Component } from 'react';
import ViewPostUser from './ViewPostUser';
import { getFavoritePostOfUser } from '../../action/userAction';
import { auth } from '../../config/helper';
import Loading from '../template/Loading';

class FavoritePost extends Component {
    state = {
        postFavorite: [],
        isLoading: true
    }
    componentDidMount() {
        var jwt = auth.isAuthenticated();
        var userId = jwt.user._id;
        getFavoritePostOfUser(userId)
            .then(data => {
                if (data.error) {
                    console.log(data);
                }
                else {
                    console.log(data)
                    this.setState({
                        postFavorite: data,
                        isLoading: false
                    })
                }
            })
    }

    render() {
        return (
            <div className="row" style={{ padding: '5px' }}>
                {this.state.postFavorite ? this.state.postFavorite.map((item, i) => {
                    return <ViewPostUser post={item} key={i} />
                }) : <Loading/>
                }
            </div>
        );


    }
}
export default FavoritePost;