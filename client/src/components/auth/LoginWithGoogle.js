import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import {loginSocial} from  '../../action/authAction';

class LoginWithGoogle extends Component {

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
                <GoogleLogin className='fadeIn fourth btnLoginSocial'
                    clientId='185189707578-c9cj84i6p7cjnhgpglik4nda5f6r45eh.apps.googleusercontent.com'
                    buttonText="Đăng nhập bằng Google"
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
  
export default connect(mapStateToProps,{loginSocial })(LoginWithGoogle);
