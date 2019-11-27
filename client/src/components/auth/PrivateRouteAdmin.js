import React from 'react'
import { Route, Redirect } from 'react-router-dom'
// import {auth} from '../../config/helper';
import { connect } from 'react-redux';

var isAuthenticatedAdmin;
const mapToStateToProps=(state)=> {
    return {
        [isAuthenticatedAdmin]: state.auth.isAuthenticatedAdmin
        // pointRateOfUser: state.post.pointRateOfUser
    }
}

const PrivateRouteAdmin = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticatedAdmin ? (
            <Component {...props} />
        ) : (
                <Redirect to={{
                    pathname: '/Login',
                    state: { from: props.location }
                }} />
            )
    )} />
)

export default connect(mapToStateToProps)(PrivateRouteAdmin);
