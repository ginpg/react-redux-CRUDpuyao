import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Employee from './elements/Employee'
import '../styles/Style.css'
import { Nav, Navbar, Form, FormControl, Button, Modal, Pagination, Container } from 'react-bootstrap'
import NewEmployee from './modals/NewEmployee'
import { lastPageAction, paginacionAction, submitSearchAction } from '../g-redux/actions/employeesActions'

import { useHistory} from 'react-router-dom'

function Employees() {
  //LISTAR
  const dispatch = useDispatch()
  

  const page = useSelector(state => state.employees.page)
  const last_page = useSelector(state => state.employees.last_page)
  const reload = useSelector(state => state.employees.reload)

  //Listar empleados
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
  const employees = useSelector(state => state.employees.employees)

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [showSuccess, setShowSuccess] = useState(false)
  const handleCloseSuccess = () => setShowSuccess(false)
  const handleShowSuccess = () => setShowSuccess(true)

  const [search,  setSearch] = useState('')


  const onChangeSearch = e => {
    setSearch(e.target.value)
    if (e.target.value === ''){
      dispatch(paginacionAction(page))
    }
  }

  const submitSearch = e => {
    e.preventDefault()
    //console.log(search)
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
      <Navbar bg="light">
        <Nav variant="tabs" className="mr-auto">
          <Nav.Link onClick={() => irEmpleados()} active> Empleados</Nav.Link>
          <Nav.Link onClick={() => irProspectos()} >Prospectos</Nav.Link>
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
          Crear Empleado
        </Button>
      </Navbar>

      <div className="List">
        <table width="100%">
            <thead>
              <tr className="ColumnTable">
                <th scope="col"> Foto </th>
                <th scope="col"> Nombre </th>
                <th scope="col"> Apellido </th>
                <th scope="col"> Departamento </th>
                <th scope="col"> Fecha de inicio </th>
                <th scope="col"> Cargo </th>
                <th scope="col"> Skills </th>
                <th scope="col"> Opciones </th>
              </tr>
            </thead>

            <tbody>
              
              {employees.map(employee => 
                (employee.activo 
                ? <Employee employee={employee}/> 
                : null))
              }
              
            </tbody>
        </table>
        
      </div>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {' '}
          <Modal.Title> Nuevo empleado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewEmployee setAux={setAux} setShow={setShow} setShowSuccess={setShowSuccess} />
        </Modal.Body>
      </Modal>

      <Modal show={showSuccess} onHide={handleCloseSuccess}>
        <Modal.Body>
          <p>Empleado creado con éxito</p>
        </Modal.Body>
        <Modal.Footer><Button variant="secondary" onClick={handleCloseSuccess}> Salir</Button></Modal.Footer>
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

export default Employees