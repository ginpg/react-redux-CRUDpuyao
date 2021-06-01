import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/Style.css'
import { Nav, Navbar, Form, FormControl, Button, Modal, Pagination, Container } from 'react-bootstrap'
import { useHistory} from 'react-router-dom'

import NewProject from './modals/NewProject'
import { lastPageAction, paginacionAction,submitSearchAction } from '../g-redux/actions/activosActions'
import Activo from './elements/Activo'


function Activos() {

  const page = useSelector(state => state.activos.page)
  const last_page = useSelector(state => state.activos.last_page)
  const reload = useSelector(state => state.activos.reload)


  //Listar 
  const dispatch = useDispatch()
  const [aux, setAux] = useState(1)
  useEffect(() => {
    if (reload){ history.go(0)}
    const list = () => dispatch(paginacionAction(page))
    dispatch(lastPageAction())
    list()
  }, [aux])

  //Paginacion
  const siguiente = () => {
    dispatch(paginacionAction(page + 1))
  }
  const anterior = () => {
    dispatch(paginacionAction(page - 1))
  }
  
  const activos = useSelector(state => state.activos.activos)

  //Modal nuevo proyecto
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

   //Busqueda
   const [search, setSearch] = useState('')

   const onChangeSearch = e => {
    setSearch(e.target.value)
    if (e.target.value === ''){
      dispatch(paginacionAction(page))
    }
  }

   const submitSearch = e => {
     e.preventDefault()
     dispatch(submitSearchAction({search,page}))
   }

  //Navegacion
  const history = useHistory();
  const irActivos = () => {
    history.push(`/projects/active`);
  }
  const irPausados = () => {
    history.push(`/projects/paused`);
  }
  const irCancelados = () => {
    history.push(`/projects/canceled`);
  }

  return (
    <Fragment>
      <Navbar bg="light">
        <Nav variant="tabs" className="mr-auto">
          <Nav.Link onClick={() => irActivos()} active> Proyectos Activos</Nav.Link>
          <Nav.Link onClick={() => irPausados()} >Proyectos Pausados</Nav.Link>
          <Nav.Link onClick={() => irCancelados()}>Proyectos Cancelados</Nav.Link>
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
          Crear Proyecto
        </Button>
      </Navbar>

      <div className="List">
        <table width="100%">
            <thead>
              <tr className="ColumnTable">
                <th scope="col"> Foto </th>
                <th scope="col"> Nombre </th>
                <th scope="col"> Tipo </th>
                <th scope="col"> Fecha de inicio </th>
                <th scope="col"> Sprints </th>
                <th scope="col"> Recursos </th>
                <th scope="col"> Categoria </th>
                <th scope="col"> Project Manager </th>
                <th scope="col"> Opciones </th>
              </tr>
            </thead>

            <tbody>
              {activos.map(activo =>  <Activo activo={activo}/> )}
            </tbody>
        </table>
      </div>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {' '}
          <Modal.Title> Nuevo proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewProject  setAux={setAux} setShow={setShow} />
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

export default Activos