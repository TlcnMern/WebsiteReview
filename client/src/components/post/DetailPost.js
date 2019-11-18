import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Comment from '../comment/Comment';
<<<<<<< HEAD
import Rating from './Rating';
import { auth,API_URL } from '../../action/helper';
import { checkRatingAndShow, getDetailPost,calculateRaingtingEachPost} from '../../action/postAction';
import { connect } from 'react-redux';
import { getComment } from '../../action/postAction';
import Loading from '../template/loading';
import ProcessRating from './ProcesRating';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
=======
import Rating from '../rating/Rating';
import ImageSlider from './sliderImage';
import { auth } from '../../action/helper';
import { checkRatingAndShow, getDetailPost,calculateRaingtingEachPost} from '../../action/postAction';
import { connect } from 'react-redux';
import { getComment } from '../../action/postAction';
import Loading from '../template/Loading';
import ProcessRating from '../rating/ProcesRating';
>>>>>>> 784ed36e5af954c40c672aa6fb9ee47852388f11

// import FeatureOfComment from '../comment/FeatureOfComment';

class DetailPost extends Component {
    constructor({ match }) {
        super();
        this.match = match
    }
    state = {
        post: null,
        isLoading: true,
        point: null,
        nav1: null,
        nav2: null
    }

    componentDidMount() {
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
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
          });

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
                          <img src={`${API_URL}/`+photo} width="300px" height="300px" alt="2R4U" style={{margin:'5px'}}/>
                      </h3>
                  </div>))}                   
              </Slider>
              <Slider
                className="imageSlider-multi"
                asNavFor={this.state.nav1}
                ref={slider => (this.slider2 = slider)}
                slidesToShow={3}
                swipeToSlide={true}
                focusOnSelect={true}>
                  {this.state.post.photo.map(photo => (
                      <div key={photo}>
                          <h3>
                              <img src={`${API_URL}/`+photo} width="100px" height="100px" alt="2R4U" style={{margin: '5px',padding: '5px',border: '1px solid #d1d1d1',boxShadow: '0 0 2px 2px #d1d1d1'}}/>
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