import React, { useEffect, useState } from 'react'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { goActive, goPending, goCanceled } from '../../config/discoveries_redux/actions/ViewSelectedActions'
import { getDiscoveryList, getLastPage, movePage } from '../../config/discoveries_redux/actions/ManageDiscoveryActions'

// Redirection
import { useHistory } from 'react-router-dom'

// Styles
import '../../styles/Style.css'
import { Nav, Navbar, Form, FormControl, Button, Modal, Pagination, Container } from 'react-bootstrap'

// Components
import SearchBar from './SearchBar/SearchBar'
import DiscoveryElement from './DiscoveryElement'

function DiscoveriesCancelled() {
  // Get history, and dispatcher
  const dispatch = useDispatch()
  const history = useHistory()

  // PAGES LOGIC
  //
  // Create pages helpers
  console.log('Setting pages from store')
  const actualPage = useSelector(state => state.manageDiscovery.actualPage)
  const lastPage = useSelector(state => state.manageDiscovery.lastPage)
  console.log('Actual page ', actualPage)
  console.log('Last page ', lastPage)

  const page_forward = () => dispatch(movePage(actualPage + 1, lastPage))
  const page_backward = () => dispatch(movePage(actualPage - 1, lastPage))

  // Save discoveries
  console.log('Saving Discoveries from store')
  const discoveryList = useSelector(state => state.manageDiscovery.discoveryList)
  const canceledDiscoveryList = discoveryList.filter(discovery => discovery.status === 'cancelado')

  console.log(discoveryList)
  console.log(canceledDiscoveryList)

  // Fetch discoveries
  useEffect(() => {
    console.log(' ')
    console.log('Use Effect CANCELED pidiendo discoveries')

    dispatch(getLastPage('cancelados'))
    dispatch(getDiscoveryList())
  }, [])

  // Redirection functions
  const go_active_actioned = () => dispatch(goActive(history))
  const go_pending_actioned = () => dispatch(goPending(history))
  const go_canceled_actioned = () => dispatch(goCanceled(history))

  /* SEARCH logic */
  /* Our search bar will navigate us to a new URL when we perform a search. We can grab this value from the URL:*/
  const filterDiscoveries = (discoveries, query) => {
    if (!query) {
      return discoveries
    }

    return discoveries.filter(discovery => {
      const discoveryName = discovery.nombre.toLowerCase()
      return discoveryName.includes(query.toLowerCase())
    })
  }

  const { search } = window.location
  const query = new URLSearchParams(search).get('searchDiscovery')
  const [searchQuery, setSearchQuery] = useState(query || '')
  const filteredDiscoveries = filterDiscoveries(canceledDiscoveryList, searchQuery)
  const action = '/gestion-operaciones/discoveries/cancelados/'

  return (
    <>
      <Navbar bg="light">
        <Nav variant="tabs" className="mr-auto">
          <Nav.Link onClick={go_active_actioned}>Discoveries Activos</Nav.Link>
          <Nav.Link onClick={go_pending_actioned}>Discoveries Pendientes</Nav.Link>
          <Nav.Link onClick={go_canceled_actioned} active>
            Discoveries Cancelados
          </Nav.Link>
        </Nav>

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} action={action} />
      </Navbar>

      <div className="List">
        <table width="100%">
          <thead>
            <tr className="ColumnTable">
              <th scope="col"> Nombre </th>
              <th scope="col"> Tipo </th>
              <th scope="col"> Fecha de Inicio </th>
              <th scope="col"> Costo (USD)</th>
              <th scope="col"> Categoría </th>
              <th scope="col"> Status </th>
              <th scope="col"> Opciones</th>
            </tr>
          </thead>

          <tbody>
            {filteredDiscoveries.slice(actualPage * 10 - 10, actualPage * 10).map(discovery => (
              <DiscoveryElement discovery={discovery} key={discovery.nombre} />
            ))}
          </tbody>
        </table>
        {actualPage === 1 ? null : (
          <Button variant="outline-secondary mr-3" onClick={page_backward}>
            Anterior
          </Button>
        )}
        <span>
          {' '}
          {actualPage} / {lastPage}{' '}
        </span>
        {actualPage === lastPage || lastPage === 1 ? null : (
          <Button variant="outline-secondary mr-3" onClick={page_forward}>
            Siguiente
          </Button>
        )}
      </div>
    </>
  )
}

export default DiscoveriesCancelled
