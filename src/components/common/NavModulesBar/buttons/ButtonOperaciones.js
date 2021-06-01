import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link, NavLink, useLocation } from 'react-router-dom'

import operacioneslogo from '../../../../assets/images/sidebarIcons/briefcase.svg'

const ButtonOperaciones = props => {
  // Manage sub module display
  //   7: "Gestión de Proyectos"
  //   8: "Gestion de Discoveries"
  //   9: "Rotacion Estrategica"
  const proyectoshow = props.showModule.filter(permiso => permiso === 7)
  const discoveryshow = props.showModule.filter(permiso => permiso === 8)
  const rotacionshow = props.showModule.filter(permiso => permiso === 9)

  return (
    <>
      <Nav.Item>
        <Link className="display-flex">
          <img src={operacioneslogo} alt="briefcase" />
          <button
            className="btn btn-toggle align-items-center rounded collapsed"
            aria-expanded={props.ariaState}
            onClick={props.collapseDispatch}
          >
            Gestion de Operaciones
          </button>
        </Link>
      </Nav.Item>

      <Nav.Item className={props.collapseState} id="orders-collapse">
        <div className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
          {proyectoshow[0] === 7 && (
            <NavLink
              to="/projects/active"
              className="link-dark rounded"
              isActive={(_, { pathname }) =>
                ['/projects/active', '/projects/paused', '/projects/canceled'].includes(pathname)
              }
              exact
              activeClassName="is-active"
            >
              Gestion de Proyectos
            </NavLink>
          )}
        </div>
      </Nav.Item>

      <Nav.Item className={props.collapseState} id="orders-collapse">
        <div className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
          {discoveryshow[0] === 8 && (
            <NavLink
              to="/gestion-operaciones/discoveries/activos"
              isActive={(_, { pathname }) =>
                [
                  '/gestion-operaciones/discoveries/activos',
                  '/gestion-operaciones/discoveries/pendientes',
                  '/gestion-operaciones/discoveries/cancelados'
                ].includes(pathname)
              }
              className="link-dark rounded"
              activeClassName="is-active"
            >
              Discoveries
            </NavLink>
          )}
        </div>
      </Nav.Item>

      <Nav.Item className={props.collapseState} id="orders-collapse">
        <div className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
          {rotacionshow[0] === 9 && (
            <NavLink
              to="/rotacion"
              className="link-dark rounded"
              isActive={(_, { pathname }) => ['/rotacion'].includes(pathname)}
              exact
              activeClassName="is-active"
            >
              Rotación Estratégica
            </NavLink>
          )}
        </div>
      </Nav.Item>

      <div className="border-top my-3"></div>
    </>
  )
}

export default ButtonOperaciones
