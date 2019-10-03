import React,{Component} from 'react';
import "../../public/stylesheets/partials/profile.css"
import "bootstrap/dist/css/bootstrap.min.css";

class follow extends Component{
    render(){
        return(
            <div class="col-md-3 col-sm-3 col-xs-12 user-profil-part pull-left">
                <div class="row ">
                    <div class="col-md-12 col-md-12-sm-12 col-xs-12 user-image text-center">
                        <img src={'localhost:4000/users/photo/'} class="rounded-circle"/>
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
        );
    }
}


export default follow;




