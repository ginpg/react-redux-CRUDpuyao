import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Nav, Navbar, Form, FormControl, Button, Container } from 'react-bootstrap'
import '../styles/Style.css'

import {
  listDisincorporatedAction,
  paginacionAction,
  submitSearchAction,
  lastPageAction
} from '../g-redux/actions/disincorporatedActions'
import A_disincorporated from './elements/A_disincorporated'

import { useHistory} from 'react-router-dom'

function Disincorporated() {
  const dispatch = useDispatch()

  //Paginacion
  const page = useSelector(state => state.disincorporated.page)
  const last_page = useSelector(state => state.disincorporated.last_page_disincorporated)
  //const reload = useSelector(state => state.employees.reload)

  const siguiente = () => {
    dispatch(paginacionAction(page + 1))
  }
  const anterior = () => {
    dispatch(paginacionAction(page - 1))
  }

  //LISTAR
  useEffect(() => {
    //if (reload){ history.go(0)}
    const list = () => dispatch(listDisincorporatedAction())
    dispatch(lastPageAction())
    list()
  }, [])
  const disincorporated_employees = useSelector(state => state.disincorporated.disincorporated)

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
          <Nav.Link onClick={() => irProspectos()} >Prospectos</Nav.Link>
          <Nav.Link onClick={() => irDesincorporados()} active>Desincorporados</Nav.Link>
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
      </Navbar>

      <div className="List">
          <table  width="100%">
            <thead>
              <tr className="ColumnTable">
                <th scope="col"> Nombre </th>
                <th scope="col"> Apellido</th>
                <th scope="col"> Departamento </th>
                <th scope="col"> Fecha de inicio </th>
                <th scope="col"> Cargo </th>
                <th scope="col"> Skills </th>
                <th scope="col"> Opciones </th>
              </tr>
            </thead>

            <tbody>

              {disincorporated_employees.map(whoever => (
                <A_disincorporated whoever={whoever} />
              ))}
            </tbody>
          </table>
      </div>


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

export default Disincorporated
