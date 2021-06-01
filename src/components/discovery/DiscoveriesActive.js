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
import CreateDiscovery from './Modals/CreateDiscovery'

function DiscoveriesActive() {
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
  const activeDiscoveryList = discoveryList.filter(discovery => discovery.status === 'activo')

  console.log(discoveryList)
  console.log(activeDiscoveryList)

  // Fetch discoveries
  useEffect(() => {
    console.log(' ')
    console.log('Use Effect ACTIVE pidiendo discoveries')

    dispatch(getLastPage('activos'))
    dispatch(getDiscoveryList())
  }, [])

  // Redirection functions
  const go_active_actioned = () => dispatch(goActive(history))
  const go_pending_actioned = () => dispatch(goPending(history))
  const go_canceled_actioned = () => dispatch(goCanceled(history))

  /* SEARCH logic */
  /*             */
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
  const filteredDiscoveries = filterDiscoveries(activeDiscoveryList, searchQuery)
  const action = '/gestion-operaciones/discoveries/activos/'

  /*  CREATE DISCOVERY MODAL logic */
  /*                              */
  /* Funciones para mostrar y cerrar la modal de detalles*/
  const [showCreateModal, setShowCreateModal] = useState(false)
  const handleCloseCreateModal = () => setShowCreateModal(false)
  const handleShowCreateModal = () => setShowCreateModal(true)

  return (
    <>
      <Navbar bg="light">
        <Nav variant="tabs" className="mr-auto">
          <Nav.Link onClick={go_active_actioned} active>
            Discoveries Activos
          </Nav.Link>
          <Nav.Link onClick={go_pending_actioned}>Discoveries Pendientes</Nav.Link>
          <Nav.Link onClick={go_canceled_actioned}>Discoveries Cancelados</Nav.Link>
        </Nav>

        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} action={action} />

        <Button type="button" className="btn btn-primary ml-2" onClick={handleShowCreateModal}>
          Crear Discovery
        </Button>
      </Navbar>

      <div className="List">
        <table width="100%">
          <thead>
            <tr className="ColumnTable">
              <th scope="col"> Nombre </th>
              <th scope="col"> Tipo </th>
              <th scope="col"> Fecha de Inicio </th>
              <th scope="col"> Costo (USD) </th>
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

      {/* Modal para mostrar detalles */}
      <Modal size="lg" show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title> Crear discovery</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CreateDiscovery handleCloseCreateModal={handleCloseCreateModal} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default DiscoveriesActive
