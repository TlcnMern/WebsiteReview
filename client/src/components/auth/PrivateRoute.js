import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import {auth} from '../../config/helper';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/Login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default PrivateRoute
