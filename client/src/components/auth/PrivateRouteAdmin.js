import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import QLPost from '../admin/post/QLPost';
import {connect} from 'react-redux';

const PrivateRouteAdmin = ({...rest }) => (
  <Route {...rest} render={props => (
    this.props.isAuthenticatedAdmin ? (
      <QLPost {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/Admin/Login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
const mapStateToProps = state => ({
  isAuthenticatedAdmin: state.auth.isAuthenticatedAdmin
});

export default connect(mapStateToProps)(PrivateRouteAdmin);
