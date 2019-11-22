import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import { loginWithFacebook } from '../../action/authAction';

class LoginWithFacebook extends Component {
    responseFacebook  = (response) => {
        const accessToken=response.accessToken;
        this.props.loginWithFacebook(accessToken);
    };
    render() {
        return (
            <div>
                <FacebookLogin
                    appId="835692456850679"
                    autoLoad={false}
                    icon="fa-facebook"
                    fields="name,email,picture"
                    callback={this.responseFacebook} />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { loginWithFacebook })(LoginWithFacebook);
