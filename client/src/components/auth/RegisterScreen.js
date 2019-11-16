import React, { Component } from 'react';
import "../../public/stylesheets/partials/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RegisterAction } from '../../action/userAction';
import { connect } from 'react-redux';
import { clearErrors } from '../../action/errorActions';

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        flag: false
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };


    onSubmitRegister = e => {
        e.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name,
            email,
            password
        };
        this.props.RegisterAction(user);
    }
    componentDidUpdate() {
        const { isAuthenticated, error } = this.props;
        if (isAuthenticated) {
            if (error.id !== null)
                this.toggle();
        }
    }
    toggle = () => {
        // Clear errors
        this.props.clearErrors();
    };

    render() {
        return (
            <div className="boxLoginorRegister fadeIn second">
                <form className="form-horizontal" method="post" onSubmit={this.onSubmitRegister}>
                    <span style={{color:'red'}}>{this.props.message}</span>

                    <input type="text" className="second" name="name" placeholder="Enter your Name" onChange={this.handleChange} required />
                    <span className="symbol-input100"><i className="fa fa-user" aria-hidden="true"></i></span>

                    <input type="text" className="second" name="email" placeholder="Enter your Email" onChange={this.handleChange} required />
                    <span className="symbol-input100"><i className="fa fa-envelope" aria-hidden="true"></i></span>
                    <span className="symbol-input100"><i className="fa fa-venus-mars" aria-hidden="true"></i></span>

                    <input type="password" className="second" name="password" placeholder="Enter your NamePassword" onChange={this.handleChange} required />
                    <span className="symbol-input100"><i className="fa fa-lock" aria-hidden="true"></i></span>

                    <input type="password" className="second" name="confirmPassword" placeholder="Confirm your Password" onChange={this.handleChange} required />
                    <span className="symbol-input100"><i className="fa fa-lock" aria-hidden="true"></i></span>

                    <input type="submit" className="fourth" value="Register" />
                </form>

            </div>

        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
    error: state.error
});


export default connect(
    mapStateToProps,
    { RegisterAction, clearErrors }
)(Register);



