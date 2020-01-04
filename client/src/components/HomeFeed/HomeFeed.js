import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../public/stylesheets/partials/style.css"
import NewFeed from './NewFeed';
import Carousel from '../slickcarousel/carousel';
import { Link } from 'react-router-dom';
import Loading from '../template/Loading';

class HomeFeed extends Component {
    state = {
        isLoading: true
    }

    onCallBackDoneNewFeed = () => {
        this.setState({ isLoading: false });
    }

    render() {
        return (
            <div className="boxContent">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="box-home">
                                <div className="header-list-index" style={{ margintop: '0px' }}><span className="title-list-index">NEW FEED</span>
                                    <Link to="AllFeed" className="all-list-index" >
                                        Xem tất cả
                                    </Link>
                                </div>
                                <hr />
                                <NewFeed onCallBack={this.onCallBackDoneNewFeed}/>
                            </div>
                            <div className="box-home fadeInDown ">
                                <div className="header-list-index box-film " style={{ margintop: '0px' }} ><span className="title-list-index ">TOP film Review</span>
                                    <Link to="/FilmFeed" className="all-list-index" >
                                        Xem tất cả
                                    </Link>
                                </div>
                                {this.state.Loading ? <Loading /> :
                                    <Carousel theme='film' />
                                }
                            </div>

                            <div className="box-home fadeInDown">
                                <div className="header-list-index " style={{ margintop: '0px' }}><span className="title-list-index ">NÊN ĐỌC GÌ</span>
                                    <Link to="/BookFeed" className="all-list-index" >
                                        Xem tất cả
                                    </Link>
                                </div>
                                {this.state.Loading ? <Loading /> :
                                    <Carousel theme='book' />
                                }
                            </div>
                            <div className="box-home fadeInDown">
                                <div className="header-list-index " style={{ margintop: '0px' }}><span className="title-list-index ">MÓN NGON NÊN THỬ</span>
                                    <Link to="/FoodFeed" className="all-list-index" >
                                        Xem tất cả
                                </Link>
                                </div>
                                {this.state.Loading ? <Loading /> :
                                    <Carousel theme='food' />
                                }
                            </div>
                            <div className="box-home fadeInDown">
                                <div className="header-list-index " style={{ margintop: '0px' }}><span className="title-list-index ">ĐI ĐÂU THÌ TỐT</span>
                                    <Link to="/TravelFeed" className="all-list-index" >
                                        Xem tất cả
                                    </Link>
                                </div>
                                {this.state.Loading ? <Loading /> :
                                    <Carousel theme='trip' />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default HomeFeed;