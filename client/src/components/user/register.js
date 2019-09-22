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
        flag:false
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };
    
    onSubmitRegister=e=>{
        e.preventDefault();
        const{name,email,password}=this.state;
        const user={
            name,
            email,
            password
        }
        if(this.state.password!==this.state.confirmPassword){
            this.setState({flag:true});
        }
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

    renderAlert(){
        const {message} =this.props;
        if( this.props.error.msg.error){
            return(
                <div class="alert alert-success">
                    <p>{this.props.error.msg.error}</p>
                </div>
            );
        }
        if( message){
            return(
                <div class="alert alert-success">
                    <p>{message}</p>
                </div>
            );
        }
    }

    render(){
        return(

            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                        <img src={logo} id="icon" alt="User Icon" />
                    </div>
                    <form className="form-horizontal" method="post" onSubmit={this.onSubmitRegister}>
                        <input type="text" id="login" className="fadeIn second" name="name" placeholder="Enter your Name" onChange={this.handleChange} />
                        <input type="text" id="login" className="fadeIn second" name="email" placeholder="Enter your Email" onChange={this.handleChange}/>
                        <input type="text" id="login" className="fadeIn second" name="password" placeholder="password"onChange={this.handleChange} />
                        <input type="text" id="login" className="fadeIn second" name="confirmPassword" placeholder="Confirm your Password"onChange={this.handleChange} />
                        <input type="submit" className="fadeIn fourth" value="Register"/>
                    </form>
                    {   
                        this.renderAlert()
                    }
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



