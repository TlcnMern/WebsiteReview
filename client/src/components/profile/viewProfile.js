import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../public/stylesheets/partials/style.css"
import ProfilePost from './profilePost';
import ProfileDetail from './profileDetail';
import ProfileEdit from './profileEdit';
import { connect } from 'react-redux';
import {fetch} from '../../action/userAction';
import {auth} from '../../action/helper';
import { API_URL } from '../../action/helper';
import man from '../../public/images/man.png';

class viewProfile extends Component {
    componentWillMount(){
        if(this.props.authenticate)
            this.props.fetch(auth.isAuthenticated().user._id,auth.isAuthenticated().token);
    }

    constructor(props) {
        super(props);
        this.state = {
          renderProfile:false,
          renderNotify:false,
          renderPost:true,
          renderEdit:false
        };
    
        this.onClickProfile=this.onClickProfile.bind(this);
        this.onClickNotify=this.onClickNotify.bind(this);
        this.onClickPost=this.onClickPost.bind(this);
        this.onClickEdit=this.onClickEdit.bind(this);
        this.onChangeRenderEdit=this.onChangeRenderEdit.bind(this);
      }
    
      
      onClickProfile(){
        this.setState({renderProfile:true});
        this.setState({renderNotify:false});
        this.setState({renderPost:false});
      };
      onClickNotify(){
          this.setState({renderNotify:true});
          this.setState({renderProfile:false});
          this.setState({renderPost:false});

      };
      onClickPost(){
          this.setState({renderPost:true});
          this.setState({renderProfile:false});
          this.setState({renderNotify:false});
      };
      onClickEdit(){
        this.setState({renderEdit:true});
      };
      onChangeRenderEdit(){
        this.setState({renderEdit:false});
      };
      renderViewOrEdit(){
        if(this.state.renderEdit)
          return <ProfileEdit onChangeRenderEdit={this.onChangeRenderEdit} /> ;
        else 
        return (
          <div>
              <ProfileDetail />
              <div className="row rowProFile ">
                    <aside className="txtProfileCol "><label></label></aside>
                    <button className="btnSaveProfile" disabled="" type="button" onClick={this.onClickEdit}>Chỉnh Sửa</button>
                </div>
          </div>
        );
      }
     
     
     
      rendermyMenu(){
        if(this.state.renderPost)
          return (
            <div>
                <ul className="nav">
                    <li  className="actived"><span onClick={this.onClickPost} >BÀI VIẾT</span></li>
                    <li><span onClick={this.onClickNotify}>THÔNG BÁO</span></li>
                    <li><span onClick={this.onClickProfile}>About me</span></li>
                </ul>
                <ProfilePost/>
            </div>
          ) ;
          if(this.state.renderNotify)
          return (
            <div>
                <ul className="nav">
                    <li ><span onClick={this.onClickPost}>BÀI VIẾT</span></li>
                    <li   className="actived"><span onClick={this.onClickNotify}>THÔNG BÁO</span></li>
                    <li><span onClick={this.onClickProfile}>About me</span></li>
                </ul>
            </div>
          ) ;
          if(this.state.renderProfile)
          return (
            <div>
                <ul className="nav">
                    <li ><span onClick={this.onClickPost}>BÀI VIẾT</span></li>
                    <li><span onClick={this.onClickNotify}>THÔNG BÁO</span></li>
                    <li className="actived"><span onClick={this.onClickProfile} >About me</span></li>
                </ul>
                {this.renderViewOrEdit()}     
            </div>
          ) ;
      }

    render() {

        const avatar=auth.getAvatar();
        var urlAvatar;
        if(avatar){
            urlAvatar=API_URL+'/'+avatar;
        }
        else{
            urlAvatar=man;
        }
        return (
        <div>
              <div className="boxContent">
                <div className="container">
                    <header>
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </header>
                    <main>
                        <div className="row">
                            <div className="left col-lg-4">
                                <div className="photo-left">
                                    <img className="photo" src={urlAvatar} alt="img"/>
                                    <button className="btnPhotoin-remove " type="button">@</button>
                                </div>
                                <h4 className="name">{this.props.profile.name}</h4>
                                <p className="info">BIỆT DANH</p>
                                <p className="info">{this.props.profile.email}</p>
                                <div className="stats row">
                                    <div className="stat col-xs-4" style={{paddingRight: '50px'}}>
                                        <p className="number-stat">3,619</p>
                                        <p className="desc-stat">Followers</p>
                                    </div>
                                    <div className="stat col-xs-4">
                                        <p className="number-stat">42</p>
                                        <p className="desc-stat">Following</p>
                                    </div>
                                    <div className="stat col-xs-4" style={{paddingLeft: '50px'}}>
                                        <p className="number-stat">38</p>
                                        <p className="desc-stat">Uploads</p>
                                    </div>
                                </div>

                            </div>
                            <div className="right col-lg-8">
                                {/* <span className="follow">Follow</span> */}
                                {this.rendermyMenu()}  
                            </div>
                        </div>
                    </main>
                </div>
            </div>

        </div>
        );
    }
}
function mapStateToProp(state){
    return{
        authenticate:state.auth.isAuthenticated,
        profile: state.user.profile
    }
}

export default connect(mapStateToProp,{fetch})(viewProfile);