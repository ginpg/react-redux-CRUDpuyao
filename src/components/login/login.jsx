// Global imports
import React, { useEffect, useState } from 'react'
import { Form, Input, Button, message, Checkbox, Alert } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

// Redux imports
import { shallowEqual, useSelector, useDispatch} from 'react-redux'
import { login } from '../../config/login_redux/actions/authenticationActions'

// Local imports
import LoginLayout from './loginLayout.jsx'

export const Login = props => {       // props contiene diferentes datos que se pueden utilizar: history, location, match etc...
  const dispatch = useDispatch()      // Para enviar acciones a la store
  const [form] = Form.useForm()       // Crear data de control
  
  const [data, setData] = useState({    
    email: '',
    password: '',
    rememberMe: false
  })
  
  const { loginResponse, pending, error } = useSelector (
    state => ({
      loginResponse: state.authentication.loginResponse,
      pending: state.authentication.pending,
      error: state.authentication.error
    }),
    shallowEqual
  )

  useEffect(() => {
    // si rememberMe es true entonces toma el email y password almacenado en el localStorage, si es false lo coloca como vacio
    const rememberMe = localStorage.getItem("rememberMe") === "true"
    const email = rememberMe ? localStorage.getItem("email") : ""
    const password = rememberMe ? localStorage.getItem("password") : ""
    //console.log(rememberMe + ' ' + email + ' ' + password)
    setData({ email, password, rememberMe })

    // Se verifica si ya tiene un token en el localStorage
    let access_token = window.localStorage.getItem('access_token')  // obtenemos el access_token almacenado en el localStorage
    if (access_token && access_token !== ''){
      props.history.push('/dashboard')                              // redirige al usuario a la ruta
    }else{
      window.localStorage.removeItem('access_token')
    }
  }, [])

  // Login exitoso
  useEffect(() => {
    if( loginResponse.token){            // loginResponse = {access_token, user}
      //guardando en el localStorage
      window.localStorage.setItem('access_token', loginResponse.token)           // guardamos el access_token
      //window.localStorage.setItem('user', JSON.stringify(loginResponse.user)) // guardamos el user
      props.history.push('/dashboard')                                         // redirige al usuario a la ruta
    }
  }, [loginResponse])

  //Manejo de los mensajes de errores
  useEffect(() => {
    let errorMessage
    if(error instanceof Object && error.hasOwnProperty('statusCode')){
      errorMessage = error?.message || 'An error ocurred. Try again later.'
      console.log(errorMessage)
      // Validando errores desde front, cualquier error que no sean estos, los valida back y muestro mensaje
      if(data.email.trim() === ''){
        message.error('Email should not be empty')
      }if(data.password === ''){
        message.error('Password should not be empty')
      }else if(data.password.length < 8){
        message.error('Password should be at least 8 characters')
      }else{
        message.error(errorMessage, 6)  
      }
    }
    
    if(error && error.hasOwnProperty('propertiesErrors')){
      let errorArray = []
      for (let [key, value] of Object.entries(error.propertiesErrors)){
        errorArray.push({
          name: key,
          errors: value
        })
      }
      form.setFields(errorArray)
    }
  }, [error])

  

  const handleInputChange = (evento) => {
    const input = evento.target;
    // si el tipo del input es checkbox se almacena como false o true
    // si el tipo del input es value se almacena como strig el usuario y clave
    const value = input.type === 'checkbox' ? input.checked : input.value;

    // actualizamos la data
    setData({
      ...data,
      [input.name] : value
    })
  }

  const onFinish = () => {
    // enviamos al login de authenticationActions con los datos.
    const { email, password, rememberMe } = data;
    console.log(data)
    
    dispatch(login(email, password, rememberMe))
    
    // almacenamos los datos en el localStorage siempre y cuando rememberMe sea true
    window.localStorage.setItem('rememberMe', rememberMe)
    window.localStorage.setItem('email', rememberMe ? email : '')
    window.localStorage.setItem('password', rememberMe ? password : '')
  }

  //onFinish se activa después de enviar el formulario
  return(
    <LoginLayout onFinish={onFinish}>       
      
      <Form.Item>
        <Input 
        prefix={<UserOutlined className="site-form-item-icon" />}
        placeholder="User" 
        name = "email"
        value = {data.email}
        onChange = {handleInputChange}
        />
      </Form.Item>
      
      <Form.Item>
        <Input 
        prefix={<LockOutlined className="site-form-item-icon" />} 
        type="password" 
        placeholder="Password"
        name = "password"
        value = {data.password}
        onChange = {handleInputChange}
        />
      </Form.Item>

      <Form.Item>
        <Checkbox 
        name = "rememberMe"
        onChange={handleInputChange} 
        checked={data.rememberMe}
        > Remember me </Checkbox>
      </Form.Item>
     
      <Form.Item className="text-center pb-5">
        <Button type="primary" htmlType="submit" loading={props.pending} block className="btn-submit">
            Login
        </Button>
      </Form.Item>
    </LoginLayout>
  )
}