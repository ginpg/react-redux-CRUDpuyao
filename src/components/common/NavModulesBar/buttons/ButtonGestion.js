import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

import gestionlogo from '../../../../assets/images/sidebarIcons/person-circle.svg'

const ButtonGestion = props => {
  // Manage if show or not a sub module
  //  0: "Gestión de Empleados",
  //  1: "Gestión de Competencias",
  //  2: "Gestión de Evaluación de Desempeño",
  //  3: "Gestión de Finanzas",

  const empleadosShow = props.showModule.filter(permiso => permiso === 0)
  const competenciasShow = props.showModule.filter(permiso => permiso === 1)
  const evaluacionShow = props.showModule.filter(permiso => permiso === 2)
  const finanzasShow = props.showModule.filter(permiso => permiso === 3)

  return (
    <>
      <Nav.Item>
        <Link className="display-flex">
          <img src={gestionlogo} alt="person-circle" />
          <button
            className="btn btn-toggle align-items-center rounded collapsed"
            aria-expanded={props.ariaState}
            onClick={props.collapseDispatch}
          >
            Gestion de Personal
          </button>
        </Link>
      </Nav.Item>

      <Nav.Item className={props.collapseState} id="orders-collapse">
        <div className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
          {empleadosShow[0] === 0 && (
            <NavLink
              to="/personal-recruitment/employees"
              className="link-dark rounded"
              isActive={(_, { pathname }) =>
                [
                  '/personal-recruitment/employees',
                  '/personal-recruitment/prospects',
                  '/personal-recruitment/disincorporated'
                ].includes(pathname)
              }
              exact
              activeClassName="is-active"
            >
              Gestion de empleados
            </NavLink>
          )}

          {competenciasShow[0] === 1 && (
            <NavLink
              to="/gestionpersonal"
              className="link-dark rounded"
              isActive={(_, { pathname }) => ['/gestionpersonal'].includes(pathname)}
              exact
              activeClassName="is-active"
            >
              Gestion de competencias
            </NavLink>
          )}

          {evaluacionShow[0] === 2 && (
            <NavLink
              to="/gestionpersonal2"
              className="link-dark rounded"
              isActive={(_, { pathname }) => ['/gestionpersonal2'].includes(pathname)}
              exact
              activeClassName="is-active"
            >
              Gestión de Evaluación de desempeño
            </NavLink>
          )}

          {finanzasShow[0] === 3 && (
            <NavLink
              to="/gestionpersonal3"
              className="link-dark rounded"
              isActive={(_, { pathname }) => ['/gestionpersonal3'].includes(pathname)}
              exact
              activeClassName="is-active"
            >
              Gestion de finanzas
            </NavLink>
          )}
        </div>
      </Nav.Item>

      <div className="border-top my-3"></div>
    </>
  )
}

export default ButtonGestion
