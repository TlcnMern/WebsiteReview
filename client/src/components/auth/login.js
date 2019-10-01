import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../action/authAction';
import { clearErrors } from '../../action/errorActions';
import "../../public/stylesheets/partials/login.css"
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../public/images/logo192.png";
import {Redirect} from 'react-router-dom';
import {auth} from '../../action/helper';


class Login extends Component {
  state = {
    modal: false,
    email: '',
    password: '',
    msg: null
  };
  //định nghĩa các prop
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  onSubmit = e => {
    e.preventDefault();//chấp nó bấm submit liên tục nè
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    // Attempt to login
    this.props.login(user);
  };

  renderAlert() {
    if (this.props.error.msg.error) 
      return (
        <div>
          <span style={{color:'red'}}>{this.props.error.msg.error}</span>
        </div>);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  
  
  render() {
    const {from} = this.props.location.state || {
      from: {
        pathname: '/'
      }
    };
    if (this.props.isAuthenticated) {
      return (<Redirect to={from}/>);
    }



    return (

      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <img src={logo} id="icon" alt="User Icon" />
          </div>

          <form onSubmit= {this.onSubmit}>
            <input type="text" id="login" className="fadeIn second" name="email" placeholder="email" onChange={this.onChange} />
            <input type="text" id="password" className="fadeIn third" name="password" placeholder="password" onChange={this.onChange} />
            <input type="submit" className="fadeIn fourth" value="Log In"/>
          </form>
          {this.renderAlert()}
          <div id="formFooter">
            <span className="underlineHover">Forgot Password?</span>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(Login);