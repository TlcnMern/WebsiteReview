import React,{Component} from 'react';
import "../../public/stylesheets/partials/profile.css"
import "bootstrap/dist/css/bootstrap.min.css";
import PofileTab from './profileTab';
import logo from '../../public/images/logo512.png';

class profile extends Component{
    render(){
        return(
            <div>
                <div className="container main-secction">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12 image-section">
                            <img src="https://png.pngtree.com/thumb_back/fw800/back_pic/00/08/57/41562ad4a92b16a.jpg" aria-hidden alt="Picture of me taking a photo of an image"/>
                        </div>
                        <div className="row user-left-part">
                            <div className="col-md-3 col-sm-3 col-xs-12 user-profil-part pull-left">
                                <div className="row ">
                                    <div className="col-md-12 col-md-12-sm-12 col-xs-12 user-image text-center">
                                        <img src={logo} className="rounded-circle" aria-hidden alt="Picture of me taking a photo of an image"/>
                                    </div>

                                    <div className="col-md-12 col-sm-12 col-xs-12 user-detail-section1 text-center">
                                                                                
                                        <button id="btn-contact" data-toggle="modal" data-target="#contact" className="btn btn-success btn-block follow">Người theo dõi</button> 
                                        <button className="btn btn-warning btn-block">Đang theo dõi</button>                        
                                    </div>
                                    <div className="row user-detail-row">
                                        <div className="col-md-12 col-sm-12 user-detail-section2 pull-left">
                                            <div className="border"></div>
                                            <p>Người theo dõi</p>
                                            <span>320</span>
                                        </div>                           
                                    </div>
                                </div>
                            </div>       
                            <div className="col-md-9 col-sm-9 col-xs-12 pull-right profile-right-section">
                                <div className="row profile-right-section-row">
                                    <div className="col-md-12 profile-header">
                                        <div className="row">
                                            <div className="col-md-8 col-sm-6 col-xs-6 profile-header-section1 pull-left">
                                                <h1>Huy Hoàng</h1>
                                                <h5>Developer</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <ul className="nav nav-tabs" role="tablist">
                                                    <PofileTab /> 
                                                </ul>
                                                <div className="tab-content">
                                                    <div role="tabpanel" className="tab-pane fade show active" id="buzz">
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 img-main-rightPart">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="row image-right-part">
                                                            <div className="col-md-6 pull-left image-right-detail">
                                                                <h6>TRÙM CÀ KHỊA</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="col-md-12 image-right">
                                                        <img src={logo} aria-hidden alt="Picture of me taking a photo of an image"/>
                                                    </div>
                                                    
                                                    <div className="col-md-12 image-right-detail-section2">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        );
    }
}


export default profile;




