import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../public/stylesheets/partials/style.css"
import HNewFeed from './HomeFeedNewFeed';
import Carousel from '../slickcarousel/carousel';
import { Link } from 'react-router-dom';

class HomeFeed extends Component{
    render() {
        return(
            <div className="boxContent">
            <div className="col-lg-12">
            <div className="row">
                <div className="col-sm-12">
                    <div className="box-home">
                        <div className="header-list-index" style={{margintop: '0px'}}><span className="title-list-index">NEW FEED</span>
                        <Link to="AllFeed" className="all-list-index" >
                            Xem tất cả
                        </Link>
                        </div>
                        <hr/>
                        <HNewFeed/>
                        
                    </div>
                    <div className="box-home fadeInDown ">
                        <div className="header-list-index box-film " style={{margintop: '0px'}} ><span className="title-list-index ">TOP film Review</span><Link to="AllFeed" className="all-list-index" >
                            Xem tất cả
                        </Link></div>
                        <Carousel/>
                    </div>
                    <div className="box-home fadeInDown">
                        <div className="header-list-index " style={{margintop: '0px'}}><span className="title-list-index ">NHẠC NỔI TRỘI</span><Link to="AllFeed" className="all-list-index" >
                            Xem tất cả
                        </Link></div>
                        <Carousel/>
                    </div>

                    <div className="box-home fadeInDown">
                        <div className="header-list-index " style={{margintop: '0px'}}><span className="title-list-index ">TRUYỀN HÌNH ĂN KHÁCH</span><Link to="AllFeed" className="all-list-index" >
                            Xem tất cả
                        </Link></div>
                        <Carousel/>

                    </div>

                    <div className="box-home fadeInDown">
                        <div className="header-list-index " style={{margintop: '0px'}}><span className="title-list-index ">NÊN ĐỌC GÌ</span><Link to="AllFeed" className="all-list-index" >
                            Xem tất cả
                        </Link></div>
                        <Carousel/>



                    </div>
                    <div className="box-home fadeInDown">
                        <div className="header-list-index " style={{margintop: '0px'}}><span className="title-list-index ">MÓN NGON NÊN THỬ</span><Link to="AllFeed" className="all-list-index" >
                            Xem tất cả
                        </Link></div>
                        <Carousel/>



                    </div>
                    <div className="box-home fadeInDown">
                        <div className="header-list-index " style={{margintop: '0px'}}><span className="title-list-index ">ĐI ĐÂU THÌ TỐT</span><Link to="AllFeed" className="all-list-index" >
                            Xem tất cả
                        </Link></div>
                        <Carousel/>


                    </div>
                    <div className="box-home fadeInDown">
                        <div className="header-list-index " style={{margintop: '0px'}}><span className="title-list-index ">LÀM ĐẸP HÔM NAY</span><Link to="AllFeed" className="all-list-index" >
                            Xem tất cả
                        </Link></div>
                        <Carousel/>




                    </div>
                </div>
            </div>
        </div>
        </div>
        );
    }
}



export default HomeFeed;