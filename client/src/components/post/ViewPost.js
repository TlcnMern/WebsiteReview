import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PostComment from "./ViewPostComment";
import Rating from './Rating';
import { auth,API_URL } from '../../action/helper';
import { checkRatingAndShow } from '../../action/postAction';
import { getComment } from '../../action/postAction';
import man from '../../public/images/man.png';

class ViewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            renderComment: false,
            renderRating: false
        };

        this.onClickComment = this.onClickComment.bind(this);
        this.onClickRating = this.onClickRating.bind(this);

    }
    state = {
        isLoading: true,
        point: null
    }


    componentDidMount() {
        const postID = this.props.post._id;
        if (this.props.isAuthenticated) {
            const jwt = auth.isAuthenticated();
            const userID = jwt.user._id;
            checkRatingAndShow(userID, { t: jwt.token }, postID).then((data) => {
                if (data === null) {
                    this.setState({
                        isLoading: false,
                        point: null
                    });
                }
                else {
                    if (data.error) {
                        console.log(data.error);
                    }
                    else {
                        this.setState({
                            isLoading: false,
                            point: data
                        })
                    }
                }
            });
        }
        getComment(this.props.post._id)
    }

    onClickComment() {
        this.setState({ renderComment: true });
        this.setState({ renderRating: false });
    };
    onClickRating() {
        this.setState({ renderRating: true });
        this.setState({ renderComment: false });
    };
    renderCommentorRating() {

        if (this.state.renderRating)
            return (
                //   <div><PostComment postId={this.props.post._id}/></div>

                <div>
                    {this.props.isAuthenticated &&
                        (
                            <div>
                                <p>Bạn đánh giá bài viết như thế nào ?</p>
                                {
                                    this.state.isLoading ? <p>dcm dang tai</p>:<Rating rating={this.state.point} idPost={this.props.post._id} />
                                }
                            </div>
                        )}
                </div>

            );
        if (this.state.renderComment)
            return (<div>
                {this.props.isAuthenticated &&
                    (
                        <div>
                            {
                                this.state.post ? <PostComment post={this.props.post} /> : <p>dcm dang tai</p>
                            }
                        </div>

                    )}
            </div>

            );
    }
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
                        <span className="rateBar-Comment" onClick={this.onClickComment}>
                            <img src="https://img.icons8.com/ios/20/000000/comments.png" alt="Comment" />
                        </span>
                        
                        {/* <span className="rateBar-Rate" onClick={this.onClickRating}>
                            <img src="https://img.icons8.com/ios/20/000000/christmas-star.png" alt="Rate" />
                        </span> */}
                        {/* {this.renderCommentorRating()} */}
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

export default connect(mapToStateProps, { getComment })(ViewPost);