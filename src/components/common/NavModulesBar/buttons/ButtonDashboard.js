import React from 'react'
import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

import dashboardlogo from '../../../../assets/images/sidebarIcons/speedometer.svg'

const ButtonDashboard = props => {
  return (
    <>
      <Nav.Item>
        <NavLink to="/dashboard" className="display-flex" id="dashboard-btn">
          <img src={dashboardlogo} alt="speedometer" />{' '}
          <button
            className="btn btn-toggle align-items-center rounded collapsed"
            /*aria-expanded={props.ariaState}
               onClick={props.collapseDispatch}*/
          >
            Dashboard
          </button>
        </NavLink>
      </Nav.Item>

      <div className="border-top my-3"></div>
    </>
  )
}

export default ButtonDashboard
