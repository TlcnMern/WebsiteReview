import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../../public/stylesheets/partials/style.css"
import "../../../public/stylesheets/partials/styleAdmin.css"
import Rating from '../../rating/Rating';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

class ViewDetail extends Component {
    constructor({ match }) {
        super();
        this.state = {
            nav1: null,
            nav2: null
        }
    }
    renderSliderImage() {
        return (
          <div className="imageSlider FadeIn-load">
            <Slider
              className="imageSlider-zoom"
              asNavFor={this.state.nav2}
              ref={slider => (this.slider1 = slider)}>
                  <div>
                      <h3>
                          <img src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/s960x960/69706491_3271032876271517_1361753289963601920_o.jpg?_nc_cat=111&_nc_ohc=S0q9ttTaXFwAQlhYiHJ4zb66LT4NPOpdfj878pndeubYpo3mh786WR4Vg&_nc_ht=scontent.fsgn2-4.fna&oh=4de7ef9e6bb21ee1c71b1335ed73babf&oe=5E53C1F3" width="300px" height="300px" alt="2R4U" style={{margin:'5px'}}/>
                      </h3>
                  </div>                 
              </Slider>
            </div>
        );
      }
    renderBoxPost(){
        return(
            <div className="CT-BaiViet ">
                    <div className="TitleBV">HÀ GIANG - TRỞ VỀ VỚI THIÊN NHIÊN</div>
                    <div className="NDBV">
                        <div className="row GT-BaiViet">
                            <div className="col-sm-4 TLBV">
                                {this.renderSliderImage()}
                            </div>
                            {/* <FeatureOfComment/> */}
                            <div className="col-sm-8 TomTat">
                                <div className="SPBV">
                                    <span>Hà Giang</span>
                                    <span> <Rating rating='3' disabled={true} /></span>
                                 

                                    <span style={{ fontSize: '13px' }}>Thể loại: <Link to="">Trip</Link></span><br />
                                </div>
                                <div className="clsTomtat">
                                    <span>Có những mảnh đất bạn đi để khám phá, có thể đến 1 lần rồi thôi.
Nhưng với Hà Giang, chỉ cần bạn đã đặt chân đến, tôi dám cá là bạn sẽ muốn quay trở lại đây nhiều lần nữa. Thật khó để tìm được một nơi yên bình, trong lành như mảnh đất Hà Giang này #CheckinVietnam #CheckinHaGiang</span><br />
                                </div>
                                <div className="clsTomtat">
                                    <span>
                                        Người đăng: Nguyễn Tuấn Vũ
                                    </span><br />
                                    <span>Sản phẩm review: Hà Giang</span><br />
                                    <span>Chủ đề: Trip</span><br />
                                    <span>Ngày đăng:
                                {new Intl.DateTimeFormat('en-GB', {
                                        month: '2-digit',
                                        day: '2-digit',
                                        year: 'numeric',
                                    }).format(new Date(23/11/2019))}
                                    </span><br />
                                </div>
                            </div>
                            
                        </div>
                        <h3 className="table-title">NỘI DUNG REVIEW</h3>
                        <div className="row MainBV ">
                                <div className="col-sm-12 ND-BaiViet">
                                    
                                    <span style={{padding:'10px'}}>Có những mảnh đất bạn đi để khám phá, có thể đến 1 lần rồi thôi.
Nhưng với Hà Giang, chỉ cần bạn đã đặt chân đến, tôi dám cá là bạn sẽ muốn quay trở lại đây nhiều lần nữa. Thật khó để tìm được một nơi yên bình, trong lành như mảnh đất Hà Giang này 
#CheckinVietnam #CheckinHaGiang </span>
                                </div>
                            </div>
                        
                    </div>
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
                    {this.renderBoxPost()}
                </div>
            </div>
        );
    }
}



export default ViewDetail;
