import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import 'font-awesome/css/font-awesome.min.css';
import "../../public/stylesheets/partials/style.css"
import { logout } from '../../action/authAction'
import logo from '../../public/images/logo.png';

class HeaderTemplate extends Component {
  renderLoginGuest() {
    return (
      <div className="LoginHeader">
        {
          !this.props.auth.isAuthenticated && (
            <Link to="Login"> <img src="https://img.icons8.com/material-outlined/24/1c94e0/login-rounded-right.png" alt="iconDN" /></Link>
          )
        }
        {
          this.props.auth.isAuthenticated && (
            <Link to="/" onClick={this.props.logout}>Logout</Link>
          )
        }

      </div>
    );
  }
  render() {
    return (
      <div className="topnav">
        <div className="row">
          <div className="col-sm-2">
            <img src={logo} width="150" height="40" alt="2R4U" />
          </div>
          <div className="col-sm-2">
            <span className="txtTOP">TRANG CHỦ</span>
          </div>

          <div className="col-sm-7">
            <div className="search-container">
              <form action="#">
                <input className="search-input" type="text" id="search-query" name="name" placeholder="Tìm kiếm" spellCheck="false" />
                <button type="submit"><i className="fa fa-search"></i></button>
              </form>
            </div>
          </div>
          <div className="col-sm-1">
            {this.renderLoginGuest()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps, { logout })(HeaderTemplate);
