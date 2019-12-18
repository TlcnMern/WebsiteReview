import React, { Component } from 'react';
import { likeComment, unLikeComment,checkLike } from '../../action/commentAction';
import '../../public/stylesheets/partials/likeComment.css'
import { auth } from '../../config/helper';
class LikeButton extends Component {
    constructor() {
        super();
        this.state = {
            liked: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        var jwt = auth.isAuthenticated();
        var userId = jwt.user._id;
        checkLike(this.props.commentId,userId).then(data=>{
            if(!data){
                console.log(data);
            }
            else{
                this.setState({
                    liked:true
                })
            }
        })
    }

    handleClick() {
        var jwt = auth.isAuthenticated();
        var userId = jwt.user._id;

        if (this.state.liked) {
            unLikeComment(this.props.commentId, userId,{t:jwt.token}).then(data => {
                if (data.err) {
                    console.log(data)
                }
                else {
                    this.setState({
                        liked: false
                    });
                }
            })
        } else {
            likeComment(this.props.commentId, userId,{t:jwt.token}).then(data => {
                if (data.err) {
                    console.log(data)
                }
                else {
                    this.setState({
                        liked: true
                    });
                }
            })
        }

    }

    render() {
        const label = this.state.liked ? 'Unlike' : 'Like'
        return (
            <div >
                <button className="btn btn-primary" onClick={this.handleClick}>
                    {label}</button>
                <p>{this.props.totalLike}</p>
            </div>
        );
    }
}
export default LikeButton