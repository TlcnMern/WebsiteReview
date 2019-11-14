import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Comment from '../comment/Comment';
import Rating from './Rating';
import ImageSlider from './sliderImage';
import { auth } from '../../action/helper';
import { checkRatingAndShow, getDetailPost } from '../../action/postAction';
import { connect } from 'react-redux';
import { getComment } from '../../action/postAction';
import Loading from '../template/loading';
import ProcessRating from './ProcesRating';

const birthdeathrates = [
    { title: "5 sao", value: 36 },
    { title: "4 sao", value: 37 },
    { title: "3 sao", value: 42 },
    { title: "2 sao", value: 0 },
    { title: "1 sao", value: 0 }
];


class DetailPost extends Component {
    state = {
        img: '',
        isLoading: false,
        point: null
    }
    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };

    componentDidMount() {
        const { post } = this.props.location.state;
        if (this.props.isAuthenticated) {
            const jwt = auth.isAuthenticated();
            const userID = jwt.user._id;
            checkRatingAndShow(userID, { t: jwt.token }, post._id).then((data) => {
                if (data === null) {
                    this.setState({
                        isLoading: true,
                        point: null
                    });
                }
                else {
                    if (data.error) {
                        console.log(data.error);
                    }
                    else {
                        this.setState({
                            isLoading: true,
                            point: data
                        })
                    }
                }
            });
        }
        this.props.getComment(post._id)
        getPhoto(post._id).then(data => {
            var base64Flag = 'data:image/jpeg;base64,';
            var imageStr =
                this.arrayBufferToBase64(data.data);
            this.setState({
                img: base64Flag + imageStr
            })
        })


    }
    render() {
        var post = {};
        if (this.props.location.state.post) {
            post = this.props.location.state.post;
        }
        return (
            <div className="boxContent">
                <div className="CT-BaiViet">
                    <div className="TitleBV">{post.title}</div>

                    <div className="NDBV">
                        <div className="row GT-BaiViet">
                            <div className="col-sm-5 TLBV">
                                <ImageSlider />

                            </div>
                            <div className="col-sm-7 TomTat">
                                <div className="SPBV">
                                    <span>{post.productReview}</span>
                                    <span> <Rating rating={3} disabled={true} /></span>
                                    <span style={{ fontSize: '13px' }}>Thể loại: <Link to="">{post.theme}</Link></span><br />
                                </div>
                                <div className="clsTomtat">
                                    <span>{post.contentSummary}</span><br />
                                </div>
                                <div className="clsTomtat">

                                    <span>Người đăng:
                                <Link to={
                                            {
                                                pathname: '/GuestViewProfile',
                                                state: { userID: post.postedBy._id }
                                            }}>
                                            {post.postedBy.name}
                                        </Link>
                                    </span><br />
                                    <span>Sản phẩm review: {post.productReview}</span><br />
                                    <span>Chủ đề: {post.theme}</span><br />
                                    <span>Ngày đăng:
                                {new Intl.DateTimeFormat('en-GB', {
                                        month: '2-digit',
                                        day: '2-digit',
                                        year: 'numeric',
                                    }).format(new Date(post.created))}
                                    </span><br />
                                </div>
                                <div className="col-sm-7 TomTat">
                                    <div className="SPBV">
                                        <span>{this.state.post.productReview}</span>
                                        <span>
                                            <Rating rating={3} disabled={true} />
                                            <ProcessRating data={birthdeathrates} />
                                        </span>

                                        <span style={{ fontSize: '13px' }}>Thể loại: <Link to="">{this.state.post.theme}</Link></span><br />
                                    </div>
                                    <div className="clsTomtat">
                                        <span>{this.state.post.contentSummary}</span><br />
                                    </div>
                                    <div className="clsTomtat">

                                        <span>Link:<a href={post.link}>{post.link}</a></span><br />


                                        <span>Link:<a href={post.link}>{post.link}</a></span><br />

                                        <span>Link:<a href={post.link}>{post.link}</a></span><br />

                                    </div>




                                </div>
                            </div>
                            <div className="row MainBV ">
                                <div className="col-sm-12 ND-BaiViet">
                                    <span className="txtND-BaiViet">Nội dung Review</span><br />
                                    <span>{post.content}</span>
                                </div>

                            </div>
                        </div>
                        <div className="CommentBV">
                            <Comment postId={post._id} />
                        </div>
                        {this.props.isAuthenticated &&
                            (
                                <div>
                                    <p>Bạn đánh giá bài viết như thế nào ?</p>
                                    {
                                        this.state.isLoading ? <Rating rating={this.state.point} idPost={post._id} /> : <p>dcm dang tai</p>
                                    }
                                </div>
                            )}
                    </div>
                </div>
            </div>
                );
            }
        }
function mapToStateToProps(state){
    return{
                    // photo:state.post.photo,
                isAuthenticated:state.auth.isAuthenticated,
                pointRateOfUser:state.post.pointRateOfUser
            }
        }
        
        
export default connect(mapToStateToProps,{getComment, getPhoto})(DetailPost) ;