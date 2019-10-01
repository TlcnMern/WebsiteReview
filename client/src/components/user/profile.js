import React,{Component} from 'react';
import "../../public/stylesheets/partials/profile.css"
import "bootstrap/dist/css/bootstrap.min.css";
import PofileTab from './profileTab';
import logo from '../../public/images/logo512.png';
import {auth} from '../../action/helper';

class profile extends Component{
    render(){
        return(
            <body>
                <div class="container main-secction">
                    <div class="row">
                        <div class="col-md-12 col-sm-12 col-xs-12 image-section">
                            <img src="https://png.pngtree.com/thumb_back/fw800/back_pic/00/08/57/41562ad4a92b16a.jpg"/>
                        </div>
                        <div class="row user-left-part">
                            <div class="col-md-3 col-sm-3 col-xs-12 user-profil-part pull-left">
                                <div class="row ">
                                    <div class="col-md-12 col-md-12-sm-12 col-xs-12 user-image text-center">
                                        <img src={'localhost:4000/users/photo/'+auth.isAuthenticated().user._id} class="rounded-circle"/>
                                    </div>

                                    <div class="col-md-12 col-sm-12 col-xs-12 user-detail-section1 text-center">
                                                                               
                                        <button id="btn-contact" data-toggle="modal" data-target="#contact" class="btn btn-success btn-block follow">Người theo dõi</button> 
                                        <button class="btn btn-warning btn-block">Đang theo dõi</button>                        
                                    </div>
                                    <div class="row user-detail-row">
                                        <div class="col-md-12 col-sm-12 user-detail-section2 pull-left">
                                            <div class="border"></div>
                                            <p>Người theo dõi</p>
                                            <span>320</span>
                                        </div>                           
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-9 col-sm-9 col-xs-12 pull-right profile-right-section">
                                <div class="row profile-right-section-row">
                                    <div class="col-md-12 profile-header">
                                        <div class="row">
                                            <div class="col-md-8 col-sm-6 col-xs-6 profile-header-section1 pull-left">
                                                <h1>Huy Hoàng</h1>
                                                <h5>Developer</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-md-8">
                                                <ul class="nav nav-tabs" role="tablist">
                                                    <PofileTab /> 
                                                </ul>
                                                <div class="tab-content">
                                                    <div role="tabpanel" class="tab-pane fade show active" id="buzz">
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-md-4 img-main-rightPart">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="row image-right-part">
                                                            <div class="col-md-6 pull-left image-right-detail">
                                                                <h6>TRÙM CÀ KHỊA</h6>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="col-md-12 image-right">
                                                        <img src={logo}/>
                                                    </div>
                                                    
                                                    <div class="col-md-12 image-right-detail-section2">
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
        </body>
        );
    }
}


export default profile;




