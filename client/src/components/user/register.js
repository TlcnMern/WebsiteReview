import React,{Component} from 'react';
import "../../public/stylesheets/partials/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../public/images/logo192.png";
import {RegisterAction}  from'../../action/userAction';
import { connect } from 'react-redux';
import { clearErrors } from '../../action/errorActions';

class Register extends Component{
    state={ 
        name: '',
        email:'',
        password:'',
        confirmPassword:'',
        gender:'',
        // birthday:Date,
        flag:false
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
    onSubmitRegister=e=>{
        e.preventDefault();
        const{name,email,password,gender,birthday}=this.state;
        const user={
            name,
            email,
            password,
            gender,
            birthday
        };
        this.props.RegisterAction(user);
    }
    componentDidUpdate(){
        const {isAuthenticated,error} =this.props;
        if (isAuthenticated) {
            if(error.id!==null)
                this.toggle();
        }
      }
    toggle = () => {
    // Clear errors
        this.props.clearErrors();
    };

    render(){
        return(

            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                        <img src={logo} id="icon" alt="User Icon" />
                        <p style={{color:'red'}}>{this.props.message} {this.props.error.msg.message}</p>
                    </div>
                    <form className="form-horizontal" method="post" onSubmit={this.onSubmitRegister}>
                        <input type="text" className="fadeIn second" name="name" placeholder="Enter your Name" onChange={this.handleChange} required/>
                        <input type="text" className="fadeIn second" name="email" placeholder="Enter your Email" onChange={this.handleChange} required/>
                        {/* <input type="datetime-local" className="birthday" name="birthday" onChange={this.handleChange} required/> */}
                        <select onChange={this.handleChange} name="gender" className="gender" >
                            <option  value="Nam">Nam</option>
                            <option selected value="Nữ">Nữ</option>
                        </select>
                        <input type="password" className="fadeIn second" name="password" placeholder="password"onChange={this.handleChange} required/>
                        <input type="password" className="fadeIn second" name="confirmPassword" placeholder="Confirm your Password" onChange={this.handleChange} required/>
                        <input type="submit" className="fadeIn fourth" value="Register"/>
                    </form>
                </div>
            </div>);
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    message:state.auth.message,
    error: state.error
  });


export default connect(
    mapStateToProps,
    { RegisterAction, clearErrors }
  )(Register);



