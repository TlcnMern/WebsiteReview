import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import {loginSocial} from  '../../action/authAction';

class LoginSocial extends Component {

    onFailure = (error) => {
        console.log(error);
    };
    googleResponse = (response) => {
        const accessToken=response.accessToken;
        this.props.loginSocial(accessToken);
    };

    render() {
        return (
            <div>
                <GoogleLogin
                    clientId='185189707578-c9cj84i6p7cjnhgpglik4nda5f6r45eh.apps.googleusercontent.com'
                    buttonText="Login"
                    onSuccess={this.googleResponse}
                    onFailure={this.onFailure}
                    
                />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});
  
export default connect(mapStateToProps,{loginSocial })(LoginSocial);
