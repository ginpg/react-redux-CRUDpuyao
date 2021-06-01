import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { routerMiddleware } from 'connected-react-router'
// import { createLogger } from 'redux-logger';

export const history = createBrowserHistory()

const middleware = [routerMiddleware(history), thunk, promise]

let composeRedux = {}

if (process.env.NODE_ENV !== 'production') {
  // middleware.push(createLogger());
  //console.log('store')
  composeRedux = compose(
    applyMiddleware(...middleware),
     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
} else {
  composeRedux = compose(applyMiddleware(...middleware))
}

export default function configureStore(reducers) {
  return createStore(reducers, composeRedux)
}
