import React,{Component} from 'react';
import "../../public/stylesheets/partials/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
            <div className="boxLoginorRegister fadeIn second">
              <form className="form-horizontal" method="post" onSubmit={this.onSubmitRegister}>
                        <input type="text" className="fadeIn second" name="name" placeholder="Enter your Name" onChange={this.handleChange} required/>
                        <span className="symbol-input100"><i className="fa fa-user" aria-hidden="true"></i></span>
                        <input type="text" className="fadeIn second" name="email" placeholder="Enter your Email" onChange={this.handleChange} required/>
                        <span className="symbol-input100"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                        <span className="symbol-input100"><i className="fa fa-venus-mars" aria-hidden="true"></i></span>
                        <input type="password" className="fadeIn second" name="password" placeholder="Enter your NamePassword"onChange={this.handleChange} required/>
                        <span className="symbol-input100"><i className="fa fa-lock" aria-hidden="true"></i></span>
                        <input type="password" className="fadeIn second" name="confirmPassword" placeholder="Confirm your Password" onChange={this.handleChange} required/>
                        <span className="symbol-input100"><i className="fa fa-lock" aria-hidden="true"></i></span>
                        <input type="submit" className="fadeIn fourth" value="Register"/>
                    </form>
             
          </div>

            );
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



