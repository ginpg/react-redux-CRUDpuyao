import React, { useState, Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Prospect from './elements/Prospect'
import '../styles/Style.css'
import { Nav, Navbar, Form, FormControl, Button, Modal, Container } from 'react-bootstrap'
import NewProspect from './modals/NewProspect'
import { lastPageAction, paginacionAction, submitSearchAction } from '../g-redux/actions/prospectsActions'

import { useHistory} from 'react-router-dom'

function Prospects() {
  const dispatch = useDispatch()

  //PAGINACION
  const page = useSelector(state => state.prospects.page)
  const last_page = useSelector(state => state.prospects.last_page)
  //const reload = useSelector(state => state.employees.reload)

  const siguiente = () => {
    dispatch(paginacionAction(page + 1))
  }
  const anterior = () => {
    dispatch(paginacionAction(page - 1))
  }

  //LISTAR
  const [aux, setAux] = useState(1)
  useEffect(() => {
    //if (reload){ history.go(0)}
    const list = () => dispatch(paginacionAction(page))
    dispatch(lastPageAction())
    list()
  }, [aux])
  const prospects = useSelector(state => state.prospects.prospects)

  //MOSTRAR FORMULARIO NUEVO PROSPECTO
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [search, setSearch] = useState('')

  const onChangeSearch = e => {
    setSearch(e.target.value)
    //console.log(e.target.value)
    if (e.target.value === ''){
      dispatch(paginacionAction(page))
    }
  }

  const submitSearch = e => {
    e.preventDefault()
    dispatch(submitSearchAction({ search, page }))
  }

  const history = useHistory();
  const irEmpleados = () => {
    history.push(`/personal-recruitment/employees`);
  }
  const irProspectos = () => {
    history.push(`/personal-recruitment/prospects`);
  }
  const irDesincorporados = () => {
    history.push(`/personal-recruitment/disincorporated`);
  }

  return (
    <Fragment>
      <Navbar bg="light" variant="light">
        <Nav variant="tabs" className="mr-auto">
        <Nav.Link onClick={() => irEmpleados()} > Empleados</Nav.Link>
          <Nav.Link onClick={() => irProspectos()} active>Prospectos</Nav.Link>
          <Nav.Link onClick={() => irDesincorporados()}>Desincorporados</Nav.Link>
        </Nav>

        <Form onSubmit={submitSearch} inline>
          <FormControl
            type="text"
            value={search}
            placeholder="Search"
            className="mr-sm-2"
            onChange={onChangeSearch}
          />
          <Button variant="outline-info" type="submit">
            Search
          </Button>
        </Form>

        <Button bg="primary" className="ml-2" onClick={handleShow}>
          Crear Prospecto
        </Button>
      </Navbar>

      <div className="List">
        <table width="100%">
            <thead>
              <tr className="ColumnTable">
                <th scope="col"> Nombre </th>
                <th scope="col"> Apellido </th>
                <th scope="col"> Fecha de inicio </th>
                <th scope="col"> Cargo </th>
                <th scope="col"> Skills </th>
                <th scope="col"> Opciones </th>
              </tr>
            </thead>

            <tbody>
              
              {prospects.map(prospect => (
                prospect.activo 
                ? <Prospect prospect={prospect} /> 
                : null))}
                
            </tbody>
        </table>
      </div>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {' '}
          <Modal.Title> Nuevo prospecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewProspect setAux={setAux} setShow={setShow}/>
        </Modal.Body>
      </Modal>


      <div className="mt-4 mb-5 display-flex justify-content-center">
        {page > 1 ? (
          <Button variant="outline-secondary mr-2" onClick={() => anterior()}>
            Anterior
          </Button>
        ) : null}
        <span className="mr-2">{page}/{last_page}</span>
        {page >= last_page ? null : (
          <Button variant="outline-secondary mr-2" onClick={() => siguiente()}>
            Siguiente
          </Button>
        )}
        
      </div>
    </Fragment>
  )
}

export default Prospects
