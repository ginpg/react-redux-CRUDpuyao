import React from 'react'
import { Nav } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

import comercialogo from '../../../../assets/images/sidebarIcons/shop.svg'

const ButtonComercial = props => {
  // Manage sub modules
  //  10: "Marketing",
  //  11: "Ventas",

  const marketingshow = props.showModule.filter(permiso => permiso === 10)
  const ventashow = props.showModule.filter(permiso => permiso === 11)

  return (
    <>
      <Nav.Item>
        <Link className="display-flex">
          <img src={comercialogo} alt="shop" />
          <button
            className="btn btn-toggle align-items-center rounded collapsed"
            aria-expanded={props.ariaState}
            onClick={props.collapseDispatch}
          >
            Gestion Comercial
          </button>
        </Link>
      </Nav.Item>

      <Nav.Item className={props.collapseState} id="orders-collapse">
        <div className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
          {marketingshow[0] === 10 && (
            <NavLink
              to="/comercial"
              className="link-dark rounded"
              isActive={(_, { pathname }) => ['/comercial'].includes(pathname)}
              exact
              activeClassName="is-active"
              style={{ display: 'block' }}
            >
              Marketing
            </NavLink>
          )}

          {ventashow[0] === 11 && (
            <NavLink
              to="/comercial2"
              className="link-dark rounded"
              isActive={(_, { pathname }) => ['/comercial2'].includes(pathname)}
              exact
              activeClassName="is-active"
              style={{ display: 'block' }}
            >
              ventas
            </NavLink>
          )}
        </div>
      </Nav.Item>

      <div className="border-top my-3"></div>
    </>
  )
}

export default ButtonComercial
