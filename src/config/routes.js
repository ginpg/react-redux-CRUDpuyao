import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

//-- Local imports
// eslint-disable-next-line
//import PrivateRoute from './private-route'

//-- Outer

import { Login } from '../components/login/login.jsx'

// Imports Cesar
import DisplayNavsFormat from '../components/common/DisplayNavsFormat'

//console.log('routes')

const AppRoutes = () => (
  <Router>
    <Switch>
      {/* Login page */}
      <Redirect exact from="/" to="/login" />
      <Route path="/login" component={Login} />

      <Route component={DisplayNavsFormat} />
    </Switch>
  </Router>
)

export default AppRoutes
