import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { likePost,unLikePost,checkLikePost } from '../../action/postAction';
import { auth } from '../../config/helper';

class FavoritePost extends Component {

    state={
        isLoading:true,
        checked:false
    }
    componentDidMount(){
        var jwt=auth.isAuthenticated();
        var userId =jwt.user._id;
        checkLikePost(this.props.postId, userId).then(data => {
            if (!data) {
                this.setState({
                    isLoading: false
                })
            }
            else {
                this.setState({
                    checked: true,
                    isLoading: false
                })
            }
        })
    }

    onclickLike = () => {
        var jwt = auth.isAuthenticated();
        var userId = jwt.user._id;
        if(!this.state.checked){
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
        if(!this.state.isLoading){
            if(this.state.checked){
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
        else{
            return <div></div>;
        }

    }
}
export default FavoritePost
