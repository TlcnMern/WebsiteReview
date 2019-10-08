import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import {logout} from '../../action/authAction'

class HeaderTemplate extends Component {
  renderLinkGuest(){
    return [
      // Unauthenticated navigation
      <li style={{marginRight:"10px"}}  key={1}>
        <Link to="/">Home</Link>
      </li>,

      <li style={{marginRight:"10px"}}  key={2}>
        <Link to="Login">Login</Link>
      </li>,

      <li style={{marginRight:"10px"}}  key={3}>
          <Link to="Register">Register</Link>
      </li>,
      <li  key={3}>
        <Link to="NewPost">post</Link>
      </li>


    ];
  }
  renderLinkUser(){
    return [
      <li style={{marginRight:"10px"}}  key={1}>
        <Link to="/">Home</Link>
      </li>,
      <li style={{marginRight:"10px"}}  key={1}>
        <Link to="Profile">My profile</Link>
      </li>,
      <li style={{marginRight:"10px"}}  key={1}>       
        <Link onClick={this.props.logout}>Logout</Link>
      </li>,
      <li  key={3}>
        <Link to="NewPost">post</Link>
      </li>

    ];
  }
  render() {
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
            {
              !this.props.auth.isAuthenticated && (
                <ul className="navbar-nav">
                  <li style={{marginRight:"10px"}}  key={1}>
                  <Link to="/">Home</Link>
                  </li>
            
                  <li style={{marginRight:"10px"}}  key={2}>
                    <Link to="Login">Login</Link>
                  </li>
            
                  <li style={{marginRight:"10px"}}  key={3}>
                      <Link to="Register">Register</Link>
                  </li>
                  <li  key={3}>
                    <Link to="NewPost">post</Link>
                  </li>
                </ul>
              )
            }
            {
              this.props.auth.isAuthenticated && (
                <ul className="navbar-nav">
                  <li style={{marginRight:"10px"}}  key={1}>
                    <Link to="/">Home</Link>
                  </li>
                  <li style={{marginRight:"10px"}}  key={1}>
                    <Link to="Profile">My profile</Link>
                  </li>
                  <li style={{marginRight:"10px"}}  key={1}>       
                    <Link onClick={this.props.logout}>Logout</Link>
                  </li>
                  <li  key={3}>
                    <Link to="NewPost">post</Link>
                  </li>
                </ul>
              )
            }
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
