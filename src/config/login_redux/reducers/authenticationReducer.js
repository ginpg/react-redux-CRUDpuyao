import AuthenticationConstants from '../constants/authenticationConstants'

//los datos que recibimos de backend
const initialState = {
  pending: false,
  loginResponse: {
    token: '',
    user: {}
  },
  error: null
}

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthenticationConstants.LOGIN_PENDING:
      return {
        ...state,
        pending: true
      }

    case AuthenticationConstants.LOGIN_FULFILLED:
      return {
        ...state,
        pending: false,
        error: null,
        loginResponse: {
          token: action.payload.access_token,
          user: action.payload.user
        }
      }

    case AuthenticationConstants.LOGIN_REJECTED_PENDING:
      return {
        ...state,
        pending: true
      }

    case AuthenticationConstants.LOGIN_REJECTED_FULFILLED:
      //Object.assign(state.loginResponse, action.payload)
      return {
        ...state,
        pending: false,
        error: action.payload
      }

    case AuthenticationConstants.LOGOUT:
      return {
        ...state,
        pending: false,
        loginResponse: {
          token: '',
          user: {}
        },
        error: null
      }

    default:
      return state
  }
}

export default authenticationReducer
