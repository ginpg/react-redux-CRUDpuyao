import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

// Imports Cesar
import NavHeader from './NavHeader'
import NavModulesBar from './NavModulesBar/NavModulesBar'
import DashboardPage from '../dashboard/DashboardPage'
import PageNotFound from '../PageNotFound'
import DiscoveriesActive from '../discovery/DiscoveriesActive'
import DiscoveriesPending from '../discovery/DiscoveriesPending'
import DiscoveriesCancelled from '../discovery/DiscoveriesCancelled'
import UpdateDiscovery from '../discovery/Modals/UpdateDiscovery'

import { Container, Row, Col } from 'react-bootstrap'

// Imports Giselt
import Principal from '../../g-components/Principal'
import Employees from '../../g-components/Employees'
import Prospects from '../../g-components/Prospects'
import Disincorporated from '../../g-components/Disincorporated'
import EditEmployee from '../../g-components/modals/EditEmployee'
import EditProspect from '../../g-components/modals/EditProspect'

import Activos from '../../g-components/Activos'
import Pausados from '../../g-components/Pausados.js'
import Cancelados from '../../g-components/Cancelados.js'

import EditProject from '../../g-components/modals/EditProject'

const authService = {
  isAuthenticated: () => {
    let access_token = window.localStorage.getItem('access_token')
    if (!access_token || access_token === '') return false

    //-- JWT validation
    /*let decoded = JWT.decode(access_token)
    if (Date.now() >= decoded.exp * 18000) {
      //-- Token expired
      //-- TODO: Renew the token
      return false
    }*/
    return true
  }
}

function DisplayNavsFormat(props) {
  return (
    <>
      {authService.isAuthenticated() === false ? (
        <Redirect to="/login" />
      ) : (
        <>
          <Container fluid className="sticky-top container-no-padding container-no-margin-left-right">
            <NavHeader history={props.history} />
          </Container>

          <Container fluid>
            <Row>
              <Col xs={2} md={2} lg={2} id="sidebar-wrapper">
                <NavModulesBar />
              </Col>

              <Col xs={10} md={10} lg={10} id="page-content-wrapper">
                <br></br>
                <Switch>
                  <Route exact path="/dashboard" component={DashboardPage} />

                  {/* Gestion personal pages */}
                  <Route exact path="/personal-recruitment/principal" component={Principal} />
                  <Route exact path="/personal-recruitment/employees" component={Employees} />
                  <Route exact path="/personal-recruitment/prospects" component={Prospects} />
                  <Route exact path="/personal-recruitment/disincorporated" component={Disincorporated} />

                  <Route exact path="/personal-recruitment/prospects/edit/:id" component={EditProspect} />
                  <Route exact path="/personal-recruitment/employees/edit/:id" component={EditEmployee} />

                  {/* Gestion de Discoveries */}
                  <Route exact path="/gestion-operaciones/discoveries/activos" component={DiscoveriesActive} />
                  <Route exact path="/gestion-operaciones/discoveries/pendientes" component={DiscoveriesPending} />
                  <Route exact path="/gestion-operaciones/discoveries/cancelados" component={DiscoveriesCancelled} />
                  <Route exact path="/gestion-operaciones/discoveries/edit/:id" component={UpdateDiscovery} />

                  {/* Gestion de Proyectos */}
                  <Route exact path="/projects/active" component={Activos} />
                  <Route exact path="/projects/paused" component={Pausados} />
                  <Route exact path="/projects/canceled" component={Cancelados} />
                  <Route exact path="/projects/edit/:id" component={EditProject} />

                  <Route component={PageNotFound} />
                </Switch>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  )
}

export default DisplayNavsFormat
