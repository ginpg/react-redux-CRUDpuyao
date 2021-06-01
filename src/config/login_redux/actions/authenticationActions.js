import API from '../../../services/api'
import AuthenticationConstants from '../constants/authenticationConstants'

//-- Save all the calls
let controllers = []

export function login(email = '', password = '', remember, isFormData = false) {
  //Recibo data del login
  let data = {
    email: email,
    password: password,
    remember: remember
  }

  if (isFormData) {
    data = new FormData()
    data.append('email', email)
    data.append('password', password)
  }

  //console.log({ 'data in action:': data })

  const [promise, controller] = API.post('auth/login', data, isFormData) //Envio data a backend
  controllers.push(controller)
  // promise = { PromiseState, PromiseResult}
  // controller = { signal: AbortSignal }

  return {
    type: AuthenticationConstants.LOGIN,
    payload: promise
  }
}

export function logout() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('user')

  console.log('Logout dispatch action')

  return {
    type: AuthenticationConstants.LOGOUT,
    payload: null
  }
}

export function cancelAllAuthentications() {
  controllers.forEach(controller => {
    controller.abort()
  })
  return {
    type: 'ABORT',
    payload: null
  }
}
