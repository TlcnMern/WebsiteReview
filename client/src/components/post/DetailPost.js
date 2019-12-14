import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Comment from '../comment/Comment';
import Rating from '../rating/Rating';
import { auth } from '../../config/helper';
import { getDetailPost } from '../../action/postAction';
import { calculateRaingtingEachPost, checkRatingAndShow } from '../../action/ratingAction';
import { connect } from 'react-redux';
import { getComment } from '../../action/commentAction';
import Loading from '../template/Loading';
import ProcessRating from '../rating/ProcesRating';
import { API_URL } from '../../config/helper';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Youtube from './Youtube';
const getVideoId = require('get-video-id');

class DetailPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null,
            isLoading: true,
            point: null,
            nav1: null,
            nav2: null,
            youtubeId:null
        }
        this.getInfodetailPost=this.getInfodetailPost.bind(this);
    }

    componentWillReceiveProps(nextProps){
        const postId = nextProps.match.params.postId;
        this.getInfodetailPost(postId)
    }

    componentDidMount() {
        const postId = this.props.match.params.postId;
        this.getInfodetailPost(postId);
    }

    getInfodetailPost(postId){
        calculateRaingtingEachPost();
        getDetailPost(postId).then((data) => {
            if (data.error) {
                console.log(data);
            }
            else {
                var youtubeId=null
                if(data[0].linkYoutube){
                    youtubeId=getVideoId(data[0].linkYoutube).id;
                }
                this.setState({
                    post: data[0],
                    youtubeId:youtubeId
                })
            }
        });
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

    renderSliderImage() {
        return (
            <div className="imageSlider FadeIn-load">
                <Slider
                    className="imageSlider-zoom"
                    asNavFor={this.state.nav2}
                    ref={slider => (this.slider1 = slider)}>
                    {this.state.post.photo.map(photo => (
                        <div key={photo}>
                            <h3>
                                <img src={`${API_URL}/` + photo} width="300px" height="300px" alt="2R4U" style={{ margin: '5px' }} />
                            </h3>
                        </div>))}
                </Slider>
            </div>
        );
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
                                    {this.renderSliderImage()}
                                </div>
                                {/* <FeatureOfComment/> */}
                                <div className="col-sm-7 TomTat">
                                    <div className="SPBV">
                                        <span>{this.state.post.productReview}</span>
                                        <span> <Rating rating={this.state.post.pointRating.point - 1} disabled={true} /></span>


                                        <span style={{ fontSize: '13px' }}>Thể loại: <Link to="">{this.state.post.kind}</Link></span><br />
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

                            </div>
                            <h3 className="table-title">NỘI DUNG REVIEW</h3>
                            <div className="row MainBV ">
                                <div className="col-sm-12 ND-BaiViet">
                                    <span style={{ padding: '10px' }}>{this.state.post.content}</span>
                                    {this.state.youtubeId &&
                                        <Youtube youtubeId={this.state.youtubeId}/>
                                    }
                                </div>
                            </div>
                            <h3 className="table-title">NGƯỜI DÙNG NHẬN XÉT</h3>
                            <div className="CommentBV">
                                <div className="row clsRatePostDetail">
                                    <div className="row col-sm-9" style={{ padding: '10px', marginLeft: '15px' }}>
                                        <div className="col-sm-4">
                                            <span>
                                                <span style={{ color: '#444', fontSize: '16px' }}>Đánh giá trung bình</span><br />
                                                <span style={{ fontSize: '48px', color: 'red' }}>{this.state.post.pointRating.point}/5 </span><br />
                                                <Rating rating={this.state.post.pointRating.point - 1} disabled={true} /></span>
                                        </div>
                                        <ProcessRating data={this.state.post.pointRating} />
                                    </div>
                                    {this.props.isAuthenticated &&
                                        (
                                            <div className="col-sm-3">
                                                <p>Đánh giá bài viết</p>
                                                {
                                                    this.state.isLoading ? <Loading /> : <Rating rating={this.state.point} idPost={this.state.post._id} />
                                                }
                                            </div>
                                        )}
                                </div>

                                <Comment postId={this.state.post._id} />
                            </div>

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