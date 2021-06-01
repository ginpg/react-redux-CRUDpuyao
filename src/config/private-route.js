import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import JWT from 'jsonwebtoken'

const authService = {
  isAuthenticated: () => {
    let access_token = window.localStorage.getItem('access_token')
    if (!access_token || access_token === '') return false

    //-- JWT validation
    /*let decoded = JWT.decode(access_token)
    if (Date.now() >= decoded.exp * 18000) {
      //-- Token expired
      //-- TODO: Renew the token
      return false
    }*/
    return true
  }
}

export default function ({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (
        authService.isAuthenticated() === true ?
          <Component {...props} />
          :<Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }} />
      )}/>
  );
}
