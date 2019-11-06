import React,{Component} from 'react';
import "../../public/stylesheets/partials/profile.css"
import "bootstrap/dist/css/bootstrap.min.css";
import PofileTab from './profileTab';
import logo from '../../public/images/logo512.png';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {auth} from '../../action/helper';
import {checkFollow} from '../../action/userAction';

import Follow from '../user/follow';
//khi gọi tới thằng này bằng redirect hoặc link, phải truyền cho nó 1 props là UserID
class profile extends Component{
    constructor(props){
        super(props);
        this.state={
            userID:this.props.location.state?this.props.location.state.userID:null
        }
    }


    componentDidMount(){
        if(this.props.isAuthenticated===true){
            const jwt = auth.isAuthenticated();
            this.props.checkFollow(jwt.user._id,{t:jwt.token},this.props.location.state.userID)
        }
    }

    render(){
        var userID;
        //trường hợp guest xem info user
        if(this.props.isAuthenticated===false){
            userID= this.state.userID;
        }
        else 
            // Trường hợp 1 user xem info 1 user
            if(auth.isAuthenticated().user._id!== this.props.location.state.userID){
                userID= this.state.userID ;
            }
            //trường hợp coi chính mình
            else{
                return(<Redirect to='/Profile' />);
            }

        return(
            <div>
                <div className="container main-secction">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12 image-section">
                            <img src="https://cdn5.f-cdn.com/contestentries/1301217/27758306/5acbe9c5814e4_thumb900.jpg"  aria-hidden alt="Picture of me taking a photo of an image"/>
                        </div>
                        <div className="row user-left-part">

                            <div className="col-md-3 col-sm-3 col-xs-12 user-profil-part pull-left">
                                <div className="row ">
                                    <div className="col-md-12 col-md-12-sm-12 col-xs-12 user-image text-center">
                                        <img src={logo}  aria-hidden alt="Picture of me taking a photo of an image" className="rounded-circle"/>
                                    </div>
                                    <Follow followID={this.state.userID}/>
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
                                                    <PofileTab userID={userID}/> 
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
                                                        <img src={logo}  aria-hidden alt="Picture of me taking a photo of an image"/>
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
function mapToStateProps(state){
    return{
        isAuthenticated:state.auth.isAuthenticated
    }
}

export default connect(mapToStateProps,{checkFollow})(profile);




