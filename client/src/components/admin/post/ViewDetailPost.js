import React, { Component } from 'react';
import {API_URL} from '../../../config/helper';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Youtube from '../../post/Youtube';
const getVideoId = require('get-video-id');

class ViewDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null,
            youtubeId:getVideoId(this.props.post.linkYoutube).id||null
        }
    }
    renderSliderImage() {
        return (
            <div className="imageSlider FadeIn-load">
                <Slider
                    className="imageSlider-zoom"
                    asNavFor={this.state.nav2}
                    ref={slider => (this.slider1 = slider)}>
                    {this.props.post.photo.map(photo => (
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
        return (
            <div className="QLPost_ViewDetail">
                <div className="clsUserName">
                    <span>Chi tiết bài viết</span>
                </div>
                <div className="clsUserPost">
                    <div className="CT-BaiViet ">
                        <div className="TitleBV">{this.props.post.title}</div>
                        <div className="NDBV">
                            <div className="row GT-BaiViet">
                                <div className="col-sm-4 TLBV">
                                    {this.renderSliderImage()}
                                </div>
                                <div className="col-sm-8 TomTat">
                                    <div className="SPBV">
                                        <span>{this.props.post.productReview}</span><br/>
                                        <span style={{ fontSize: '13px' }}>Thể loại: {this.props.post.theme}</span><br />
                                    </div>
                                    <div className="clsTomtat">
                                        <span>{this.props.post.contentSummary}</span><br />
                                    </div>
                                    <div className="clsTomtat">
                                        <span>
                                            Người đăng: {this.props.post.postedBy.name}
                                        </span><br />
                                        <span>Sản phẩm review:{this.props.post.productReview}</span><br />
                                        <span>Chủ đề: Trip</span><br />
                                        <span>Ngày đăng:
                                {new Intl.DateTimeFormat('en-GB', {
                                            month: '2-digit',
                                            day: '2-digit',
                                            year: 'numeric',
                                        }).format(new Date(this.props.post.created))}
                                        </span><br />
                                    </div>
                                </div>

                            </div>
                            <h3 className="table-title">NỘI DUNG REVIEW</h3>
                            <div className="row MainBV ">
                                <div className="col-sm-12 ND-BaiViet">
                                    <span style={{ padding: '10px' }}>{this.props.post.content} </span>
                                    {this.state.youtubeId &&
                                        <Youtube youtubeId={this.state.youtubeId}/>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default ViewDetail;
