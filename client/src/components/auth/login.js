import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../action/authAction';
import { clearErrors } from '../../action/errorActions';
import "../../public/stylesheets/partials/login.css"
import "bootstrap/dist/css/bootstrap.min.css";
// import logo from "../../public/images/logo192.png";
import {Redirect} from 'react-router-dom';
// import LoginSocial from '../template/LoginSocial';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';



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

      // <div className="boxContent wrapper fadeInDown">
      //   <div id="formContent">
      //     <div className="fadeIn first">
      //       <img src={logo} id="icon" alt="User Icon" />
      //     </div>

      //     <form onSubmit= {this.onSubmit}>
            
      //       <span>
      //         <input type="text" id="login" className="fadeIn second" name="email" placeholder="email" onChange={this.onChange} />
      //       </span>
      //       <span class="symbol-input100">
      //         <i class="fa fa-envelope" aria-hidden="true"></i>
      //       </span>

      //       <span>
      //         <input type="password" id="password" className="fadeIn third" name="password" placeholder="password" onChange={this.onChange} />
      //       </span>
      //       <span class="symbol-input100">	
      //         <i class="fa fa-lock" aria-hidden="true"></i>
      //       </span>


            
      //       <input type="submit" className="fadeIn fourth" value="Log In"/>
      //     </form>
      //     {this.renderAlert()}
      //     <LoginSocial/>
      //     <div style={{marginTop:"10px"}} id="formFooter">
      //       <span className="underlineHover">Forgot Password?</span>
      //     </div>

      //   </div>
      // </div>


      <div className="boxContent" >
      <div className="dialogLogin">
          <LoginScreen/>
          <RegisterScreen/>
          
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