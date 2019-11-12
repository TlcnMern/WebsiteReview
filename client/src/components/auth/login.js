import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../action/authAction';
import { clearErrors } from '../../action/errorActions';
import "../../public/stylesheets/partials/login.css"
import "bootstrap/dist/css/bootstrap.min.css";
import {Redirect} from 'react-router-dom';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
class Login extends Component {
  
  
  constructor(props){
    super(props);
    this.state={
        renderLogin:true,
        renderRegister:false
    };
    this.onClickLogin=this.onClickLogin.bind(this);
    this.onClickRegister=this.onClickRegister.bind(this);
  }
  onClickLogin(){
    this.setState({renderLogin:true});
    this.setState({renderRegister:false});
  };
  onClickRegister(){
      this.setState({renderRegister:true});
      this.setState({renderLogin:false});
  };
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
  renderleftContent(){
    const {from} = this.props.location.state || {
      from: {
        pathname: '/'
      }
    };
    if (this.props.isAuthenticated) {
      return (<Redirect to={from}/>);
    }
    if(this.state.renderLogin)
      return (
        <div className="loginleft" id="loginleft">
        
        <div className="Left-Content fadeIn second">
          <h2>Đăng nhập</h2>
          <p>Đăng nhập để theo dõi đơn hàng, lưu <br/>danh sách sản phẩm yêu thích, nhận<br/> nhiều ưu đãi hấp dẫn.</p>
          <img src="https://frontend.tikicdn.com/_new-next/static/img/graphic-map.png" alt="vu"/>
        </div>
         </div>
        
      ) ;
      if(this.state.renderRegister)
      return (
        <div className="loginleft" id="loginleft">
        
        <div className="Left-Content fadeIn second">
          <h2>Tạo tài khoản</h2>
          <p>Tạo tài khoản để theo dõi đơn hàng, lưu <br/>danh sách sản phẩm yêu thích, nhận<br/> nhiều ưu đãi hấp dẫn.</p>
          <img src="https://frontend.tikicdn.com/_new-next/static/img/graphic-map.png" alt="vu"/>
          </div>
         </div>
        
      ) ;
  }
  rendermyMenu(){
    const {from} = this.props.location.state || {
      from: {
        pathname: '/'
      }
    };
    if (this.props.isAuthenticated) {
      return (<Redirect to={from}/>);
    }
    if(this.state.renderLogin)
      return (
        <div className="loginright">
            <ul className="nav">
                <li  className="actived"><span onClick={this.onClickLogin} >Login</span></li>
                <li><span onClick={this.onClickRegister}>Register</span></li>
            </ul>
            <LoginScreen/>
        </div>
      ) ;
      if(this.state.renderRegister)
      return (
        <div className="loginright">
            <ul className="nav">
                <li ><span onClick={this.onClickLogin}>Login</span></li>
                <li className="actived"><span onClick={this.onClickRegister} >Register</span></li>
            </ul>
            <RegisterScreen/>
          
        </div>
      ) ;
  }
  
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
      <div className="boxContent" >
        <div className="dialogLogin">
        {this.renderleftContent()}  
        {this.rendermyMenu()}  
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