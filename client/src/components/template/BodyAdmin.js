import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../public/stylesheets/partials/style.css"
import "../../public/stylesheets/partials/styleAdmin.css"
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../action/authAction';


class MainFeed extends Component{
    static propTypes = {
        isAuthenticated: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
          renderPost:true,
          renderUser:false,
          renderAna:false,
        };
    
        this.onClickPost=this.onClickPost.bind(this);
        this.onClickUser=this.onClickUser.bind(this);
        this.onClickAnalytics=this.onClickAnalytics.bind(this);
      }
     
      onClickPost(){
        this.setState({renderPost:true});
        this.setState({renderUser:false});
        this.setState({renderAna:false});
      };
      onClickUser(){
        this.setState({renderUser:true});
        this.setState({renderPost:false});
        this.setState({renderAna:false});
      };
      onClickAnalytics(){
        this.setState({renderAna:true});
        this.setState({renderPost:false});
        this.setState({renderUser:false});
      };
     
      rendermyMenu(){
        if(this.state.renderPost)  
        return(
              <ul className="menuAdmin">
                  <li className="actived" >
                    <Link to="/" onClick={this.onClickPost}>
                      <i className="fa fa-sticky-note-o" aria-hidden="true"/>
                      <span>Quản lý bài viết</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="QLUser" onClick={this.onClickUser}>
                      <i className="fa fa-user" aria-hidden="true"/>
                      <span>Quản lý người dùng</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="Analytics" onClick={this.onClickAnalytics}>
                      <i className="fa fa-bar-chart" aria-hidden="true"/>
                      <span>Chức năng thống kê</span>
                    </Link> 
                  </li>
                  
              </ul>
          )
          if(this.state.renderUser)  
        return(
              <ul className="menuAdmin">
                  <li onClick={this.onClickPost}>
                    <Link to="/">
                      <i className="fa fa-sticky-note-o" aria-hidden="true"/>
                      <span>Quản lý bài viết</span>
                    </Link>
                  </li>
                  <li  className="actived">
                    <Link to="QLUser" onClick={this.onClickUser}>
                      <i className="fa fa-user" aria-hidden="true"/>
                      <span>Quản lý người dùng</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="Analytics" onClick={this.onClickAnalytics}>
                      <i className="fa fa-bar-chart" aria-hidden="true"/>
                      <span>Chức năng thống kê</span>
                    </Link> 
                  </li>
                  
              </ul>
          )
          if(this.state.renderAna)  
          return(
                <ul className="menuAdmin">
                    <li onClick={this.onClickPost}>
                    <Link to="/">
                      <i className="fa fa-sticky-note-o" aria-hidden="true"/>
                      <span>Quản lý bài viết</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="QLUser" onClick={this.onClickUser}>
                    <i className="fa fa-user" aria-hidden="true"/>
                      <span>Quản lý người dùng</span>
                    </Link>
                  </li>
                  <li className="actived">
                    <Link to="Analytics" onClick={this.onClickAnalytics}>
                      <i className="fa fa-bar-chart" aria-hidden="true"/>
                      <span>Chức năng thống kê</span>
                    </Link> 
                  </li>
                    
                </ul>
            )
      }
    render() {
        return(
        <div className=" boxAdmin">
          {this.rendermyMenu()}
        </div>
    
        );
        
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  export default connect(mapStateToProps,{logout})(MainFeed);