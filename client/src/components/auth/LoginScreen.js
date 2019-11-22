import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../action/authAction';
import { clearErrors } from '../../action/errorActions';
import "../../public/stylesheets/partials/login.css"
import "bootstrap/dist/css/bootstrap.min.css";
import LoginWithGoogle from './LoginWithGoogle';
import LoginWithFacebook from './LoginWithFacebook';

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
          <span style={{ color: 'red' }}>{this.props.error.msg.error}</span>
        </div>);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  render() {
    return (
      <div className="boxLoginorRegister second" id="loginleft">
        <form onSubmit={this.onSubmit}>
          <span>
            <input type="text" id="login" className="second" name="email" placeholder="email" onChange={this.onChange} />
          </span>
          <span className="symbol-input100">
            <i className="fa fa-user" aria-hidden="true"></i>
          </span>
          <span>
            <input type="password" id="password" className="third" name="password" placeholder="password" onChange={this.onChange} />
          </span>
          <span className="symbol-input100">
            <i className="fa fa-lock" aria-hidden="true"></i>
          </span>
          <p className="forgot-password second">Quên mật khẩu? Nhấn vào <Link to="/ForgotPassword">đây</Link></p>
          <input type="submit" className="fadeIn fourth" id="btnLogin" value="Log In" />
        </form>
        {this.renderAlert()}
        <LoginWithGoogle />
        <LoginWithFacebook/>
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