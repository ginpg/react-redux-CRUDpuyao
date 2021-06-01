import React from 'react'
import { Navbar, NavDropdown, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// Redux imports
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import { logout } from '../../config/login_redux/actions/authenticationActions'

import shoklogo from '../../assets/images/logos/Logo1.png'
import configlogo from '../../assets/images/configIcons/gearicon1.png'

function NavHeader(props) {
  const dispatch = useDispatch()

  const logoutAction = e => {
    e.preventDefault()
    console.log('loging out on click')

    dispatch(logout())

    props.history.push('/login')
  }
  return (
    <>
      <Navbar className="spread-both navbar-aesthethic">
        <Navbar.Brand>
          <Link to="/dashboard" className="nav-Link">
            <img src={shoklogo} width="60px" height="60px" className="d-inline-block" alt="Shokworks logo" /> Shokworks
          </Link>
        </Navbar.Brand>

        <div id="config_dropdown">
          <NavDropdown
            title={
              <img src={configlogo} width="40px" height="40px" className="d-inline-block align-top" alt="Config logo" />
            }
            id="nav-dropdown"
          >
            <NavDropdown.Item>Perfil</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Configuracion</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item id="logout_button_outer_padding">
              <Button variant="danger" onClick={logoutAction} className="logout_button_inner_padding">
                Logout
              </Button>
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </Navbar>
    </>
  )
}

export default NavHeader
