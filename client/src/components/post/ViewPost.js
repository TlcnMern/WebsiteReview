import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import PostComment from "./ViewPostComment";
import Rating from './Rating';
import { auth,API_URL } from '../../action/helper';
import { checkRatingAndShow } from '../../action/postAction';
import { getComment } from '../../action/postAction';
import man from '../../public/images/man.png';
=======
import Rating from '../rating/Rating';
import { API_URL } from '../../config/helper';
>>>>>>> 29dc5ae69c4376d54d63feaf0b45de73ddb487e3

class ViewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            point: null
        };

    }

    onClickComment() {
        this.setState({ renderComment: true });
    };
    render() {
        const avatar = this.props.post.postedBy.avatar;
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
            <div className="row clsNEWFEED fadeInDown">
                <Link to="Theme" id="btnDetailTheme"><span style={{ textTransform: 'capitalize' }}>{this.props.post.theme}</span></Link>
                <div className="col-sm-3">
                    <div className="imgDD FadeIn-load">
                        <img id="imgSP" src={`${API_URL}/`+this.props.post.photo[0]} alt="imgDemo1" /><br />
                        <Link to="SearchSP">{this.props.post.productReview}</Link>
                        <span>
                        <span> <Rating rating={this.props.post.pointRating.point-1} disabled={true} /></span>
                        </span>
                    </div>
                </div>
                <div className="col-sm-9 detail-NEWFEED FadeIn-load">
                    <div className="detail-Title">
                        <Link to={
                            {
                                pathname: `/DetailPost/${this.props.post._id}`
                            }
                        }>
                            <span className="txt-NameBV">{this.props.post.title}</span>
                        </Link>
                        <span className="tooltiptext">{this.props.post.title}</span>
                    </div>

                    <br />
                    <div className="text-muted">

                        <Link to={
                            {
                                pathname: `/GuestViewProfile/${this.props.post.postedBy._id}`
                            }
                        }>
                            <span title={this.props.post.postedBy.name}><img style={{ marginRight: '5px' }} width="22px " height="22px" className="user_avatar_link " src={urlAvatar} alt="imageuser" /></span>
                            <span style={{ marginLeft: '10px' }}>{this.props.post.postedBy.name}</span>
                        </Link>

                        {new Intl.DateTimeFormat('en-GB', {
                            month: '2-digit',
                            day: '2-digit',
                            year: 'numeric',
                        }).format(new Date(this.props.post.created))}

                    </div>
                    <p>{this.props.post.contentSummary}</p>
                    <div className="rateBar">
                        <span className="rateBar-Like"><img src="https://img.icons8.com/ios/20/000000/like.png" alt="Like" /></span>
                        <span className="rateBar-Comment" >
                            <img src="https://img.icons8.com/ios/20/000000/comments.png" alt="Comment" />
                        </span>
<<<<<<< HEAD
                        
                        {/* <span className="rateBar-Rate" onClick={this.onClickRating}>
                            <img src="https://img.icons8.com/ios/20/000000/christmas-star.png" alt="Rate" />
                        </span> */}
                        {/* {this.renderCommentorRating()} */}
=======
                        <span>
                        <span> <Rating rating={this.props.post.pointRating.point-1} disabled={true} /></span>
                        </span>
>>>>>>> 29dc5ae69c4376d54d63feaf0b45de73ddb487e3
                    </div>
                </div>
            </div>
        );
    }
}
function mapToStateProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        pointRateOfUser: state.post.pointRateOfUser
    }
}

export default connect(mapToStateProps)(ViewPost);