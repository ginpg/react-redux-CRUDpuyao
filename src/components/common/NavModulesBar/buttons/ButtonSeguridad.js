import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

import securityLogo from '../../../../assets/images/sidebarIcons/shield.svg'

const ButtonSeguridad = props => {
  //  Manage sub module
  const loginshow = props.showModule.filter(permiso => permiso === 4)
  const auditoriashow = props.showModule.filter(permiso => permiso === 5)
  const roleshow = props.showModule.filter(permiso => permiso === 6)

  return (
    <>
      <Nav.Item>
        <Link className="display-flex">
          <img src={securityLogo} alt="shield" />
          <button
            className="btn btn-toggle align-items-center rounded collapsed"
            aria-expanded={props.ariaState}
            onClick={props.collapseDispatch}
          >
            Seguridad
          </button>
        </Link>
      </Nav.Item>

      <Nav.Item className={props.collapseState} id="orders-collapse">
        <div className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
          {loginshow[0] === 4 && (
            <NavLink
              to="/seguridad"
              className="link-dark rounded"
              isActive={(_, { pathname }) => ['/seguridad'].includes(pathname)}
              exact
              activeClassName="is-active"
            >
              Login / Registro
            </NavLink>
          )}

          {auditoriashow[0] === 5 && (
            <NavLink
              to="/seguridad2"
              className="link-dark rounded"
              isActive={(_, { pathname }) => ['/seguridad2'].includes(pathname)}
              exact
              activeClassName="is-active"
            >
              Auditoria
            </NavLink>
          )}

          {roleshow[0] === 6 && (
            <NavLink
              to="/seguridad3"
              className="link-dark rounded"
              isActive={(_, { pathname }) => ['/seguridad3'].includes(pathname)}
              exact
              activeClassName="is-active"
            >
              Permisos,roles y perfiles
            </NavLink>
          )}
        </div>
      </Nav.Item>

      <div className="border-top my-3"></div>
    </>
  )
}

export default ButtonSeguridad
