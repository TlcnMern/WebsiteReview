import React, { Component } from 'react';
import {connect} from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../public/stylesheets/partials/style.css"
import {logout} from '../../action/authAction'
import logo from '../../public/images/logo.png';

class HeaderTemplate extends Component {

  render() {
    return (
      <div className="topnav">
      <div className="row">
          <div className="col-sm-2">
              <img src={logo} width="150" height="40" alt="2R4U"/>
          </div>
          <div className="col-sm-7">
              <span className="txtTOP">TRANG CHỦ</span>
          </div>
          
          <div className="col-sm-3">
              <div className="search-container">
                  <form action="#">
                      <input className="search-input" type="text" id="search-query" name="name" placeholder="Tìm kiếm" spellCheck="false"/>
                      <button type="submit"><i className="fa fa-search"></i></button>
                  </form>
              </div>
          </div>
          
      </div>

  </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps,{logout})(HeaderTemplate);
