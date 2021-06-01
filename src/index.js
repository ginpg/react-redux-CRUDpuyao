// Global imports
import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from 'connected-react-router'

//-- Redux management
import { Provider } from 'react-redux'
import reducers from './config/login_redux/reducers'
import configStore, { history } from './config/store'

//-- Import needed styles
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import './index.css'

//-- Routes imports
import AppRoutes from './config/routes'

const store = configStore(reducers(history))

//console.log('Index scr')

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppRoutes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
