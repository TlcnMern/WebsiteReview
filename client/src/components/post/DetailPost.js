import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Comment from '../comment/Comment';
import Rating from '../rating/Rating';
import ImageSlider from './sliderImage';
import { auth } from '../../config/helper';
import {getDetailPost} from '../../action/postAction';
import {calculateRaingtingEachPost,checkRatingAndShow} from '../../action/ratingAction';
import { connect } from 'react-redux';
import { getComment } from '../../action/commentAction';
import Loading from '../template/Loading';
import ProcessRating from '../rating/ProcesRating';

// import FeatureOfComment from '../comment/FeatureOfComment';

class DetailPost extends Component {
    constructor({ match }) {
        super();
        this.state = {
            post: null,
            isLoading: true,
            point: null
        }
        this.match = match;
        const postId = this.match.params.postId;
        getDetailPost(postId).then((data) => {
            if (data.error) {
                console.log(data);
            }
            else {
                this.setState({
                    post: data[0]
                })
            }
        });
    }
    componentDidMount() {
        const postId = this.match.params.postId;
        calculateRaingtingEachPost();
        if (this.props.isAuthenticated) {
            const jwt = auth.isAuthenticated();
            const userID = jwt.user._id;
            checkRatingAndShow(userID, { t: jwt.token }, postId).then((data) => {
                if (data.error) {
                    this.setState({
                        isLoading: false,
                        point: null
                    })
                }
                else {
                    this.setState({
                        isLoading: false,
                        point: data
                    })
                }
            });
        }
        this.props.getComment(postId)
    }
    render() {
        if (this.state.post === null) {
            return (
                <div className="row">
                    <div className="col-lg-5"></div>
                    <Loading className="col-lg-3" />
                </div>);
        }
        else {
            return (
                <div className="boxContent">
                    <div className="CT-BaiViet">
                        <div className="TitleBV">{this.state.post.title}</div>
                        <div className="NDBV">
                            <div className="row GT-BaiViet">
                                <div className="col-sm-5 TLBV">
                                    <ImageSlider />
                                </div>
                                {/* <FeatureOfComment/> */}
                                <div className="col-sm-7 TomTat">
                                    <div className="SPBV">
                                        <span>{this.state.post.productReview}</span>
                                        <span> <Rating rating={this.state.post.pointRating.point-1} disabled={true} /></span>
                                        <ProcessRating data={this.state.post.pointRating} />

                                        <span style={{ fontSize: '13px' }}>Thể loại: <Link to="">{this.state.post.theme}</Link></span><br />
                                    </div>
                                    <div className="clsTomtat">
                                        <span>{this.state.post.contentSummary}</span><br />
                                    </div>
                                    <div className="clsTomtat">
                                        <span>
                                            Người đăng:
                                                <Link to={
                                                {
                                                    pathname: `/GuestViewProfile/${this.state.post.postedBy._id}`
                                                }}>
                                                {this.state.post.postedBy.name}
                                            </Link>
                                        </span><br />
                                        <span>Sản phẩm review: {this.state.post.productReview}</span><br />
                                        <span>Chủ đề: {this.state.post.theme}</span><br />
                                        <span>Ngày đăng:
                                    {new Intl.DateTimeFormat('en-GB', {
                                            month: '2-digit',
                                            day: '2-digit',
                                            year: 'numeric',
                                        }).format(new Date(this.state.post.created))}
                                        </span><br />
                                    </div>
                                </div>
                                <div className="row MainBV ">
                                    <div className="col-sm-12 ND-BaiViet">
                                        <span className="txtND-BaiViet">Nội dung Review</span><br />
                                        <span>{this.state.post.content}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="CommentBV">
                                <Comment postId={this.state.post._id} />
                            </div>
                            {this.props.isAuthenticated &&
                                (
                                    <div>
                                        <p>Bạn đánh giá bài viết như thế nào ?</p>
                                        {
                                            this.state.isLoading ? <Loading /> : <Rating rating={this.state.point} idPost={this.state.post._id} />
                                        }
                                    </div>
                                )}
                        </div>
                    </div>
                </div>
            );
        }

    }
}
function mapToStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        pointRateOfUser: state.post.pointRateOfUser
    }
}


export default connect(mapToStateToProps, { getComment })(DetailPost);