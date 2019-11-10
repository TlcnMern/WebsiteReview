import React,{Component} from 'react';
import "../../public/stylesheets/partials/profile.css"
import "bootstrap/dist/css/bootstrap.min.css";
import ProfilePost from './profilePost';
import ProfileDetail from './profileDetail'
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
            userID:this.props.location.state?this.props.location.state.userID:null,
            renderProfile:false,
            renderPost:true
        };
        this.onClickProfile=this.onClickProfile.bind(this);
        this.onClickPost=this.onClickPost.bind(this);
    }
    onClickProfile(){
        this.setState({renderProfile:true});
        this.setState({renderPost:false});
      };
      onClickPost(){
          this.setState({renderPost:true});
          this.setState({renderProfile:false});
      };

    componentDidMount(){
        if(this.props.isAuthenticated===true){
            const jwt = auth.isAuthenticated();
            this.props.checkFollow(jwt.user._id,{t:jwt.token},this.props.location.state.userID);
   
        }
    }


    rendermyMenu(){
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
                return(<Redirect to='/ViewProfile' />);
            }
        if(this.state.renderPost)
          return (
            <div>
                <ul className="nav">
                    <li  className="actived"><span onClick={this.onClickPost} >BÀI VIẾT</span></li>
                    <li><span onClick={this.onClickProfile}>About me</span></li>
                </ul>
                <ProfilePost/>
            </div>
          ) ;
          if(this.state.renderProfile)
          return (
            <div>
                <ul className="nav">
                    <li ><span onClick={this.onClickPost}>BÀI VIẾT</span></li>
                    <li className="actived"><span onClick={this.onClickProfile} >About me</span></li>
                </ul>
                <ProfileDetail userID={userID}/>    
            </div>
          ) ;
      }

    render(){

        return(
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
                              <img className="photo" src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/p720x720/72482897_955642461456268_3228701545478488064_o.jpg?_nc_cat=102&cachebreaker=hd&_nc_oc=AQkp7PgHFmqowW2nscPch3Ts7CgsISmdsSExZ5_qfKdVIN5tAlqBz4H5tTfG665daao&_nc_ht=scontent.fsgn2-2.fna&oh=18ed1cfefbaf148fd48d05f3d4b25684&oe=5E21D2EA"  alt="img"/>
                              <div className="active"></div>
                          </div>
                          <h4 className="name">Nguyễn Tuấn Vũ</h4>
                          <p className="info">DEVELOPER</p>
                          <p className="info">a@gmail</p>
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
                          <span className="follow"><Follow followID={this.state.userID}/></span>
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
function mapToStateProps(state){
    return{
        isAuthenticated:state.auth.isAuthenticated
    }
}

export default connect(mapToStateProps,{checkFollow})(profile);




