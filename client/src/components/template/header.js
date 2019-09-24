import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import {logout} from '../../action/userAction'

class HeaderTemplate extends Component {
  renderLinkGuest(){
    return [
      // Unauthenticated navigation
      <li style={{marginRight:"10px"}} className="nav-item active" key={1}>
        <Link to="/">Home</Link>
      </li>,

      <li style={{marginRight:"10px"}} className="nav-item active" key={2}>
        <Link to="Login">Login</Link>
      </li>,

      <li className="nav-item active" key={3}>
          <Link to="register">Register</Link>
      </li>
    ];
  }
  renderLinkUser(){
    return [
      <li style={{marginRight:"10px"}} className="nav-item active" key={1}>
        <Link to="/">Home</Link>
      </li>,
      <li style={{marginRight:"10px"}} className="nav-item active" key={1}>
        <Link to="profile">My profile</Link>
      </li>,
      <li className="nav-item active" key={1}>       
        <Link onClick={this.props.logout}>Logout</Link>
      </li>

    ];
  }
  render() {
    const {isAuthenticated}=this.props.auth;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/">
            <span className="navbar-brand">
              Website Review
            </span>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            {isAuthenticated ? this.renderLinkUser() :this.renderLinkGuest()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps,{logout})(HeaderTemplate);
