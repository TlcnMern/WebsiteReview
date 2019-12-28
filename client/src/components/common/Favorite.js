import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { likePost,unLikePost } from '../../action/postAction';
import { auth } from '../../config/helper';

class FavoritePost extends Component {
    onclickLike = () => {
        var jwt = auth.isAuthenticated();
        var userId = jwt.user._id;
        if(!this.props.checked){
            likePost(this.props.postId, userId, { t: jwt.token }).then(data=>{
                console.log(data);
            })
        }
        else{
            unLikePost(this.props.postId, userId, { t: jwt.token }).then(data=>{
                console.log(data);
            })
        }

    }
    render() {
        console.log(this.props.checked)
        if(this.props.checked){
            return (
                <FormControlLabel
                    control={< Checkbox onClick={this.onclickLike} icon={< Favorite />} checkedIcon={< FavoriteBorder />} value="checkedH" />}
                    label="Yêu thích"
                />
            );
        }
        else{
            return (
                <FormControlLabel
                    control={< Checkbox onClick={this.onclickLike} icon={< FavoriteBorder />} checkedIcon={< Favorite />} value="checkedH" />}
                    label="Yêu thích"
                />
            );
        }

    }
}
export default FavoritePost
