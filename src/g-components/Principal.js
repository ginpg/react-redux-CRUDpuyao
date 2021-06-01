import React, {Fragment, useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import Employee from './elements/Employee'
import '../styles/Style.css';
import { Nav,Navbar, Form, FormControl, Button ,Modal, Pagination, Container} from 'react-bootstrap';
import NewEmployee from './modals/NewEmployee'

import { listEmployeesAction } from '../g-redux/actions/employeesActions'

import { useHistory } from "react-router-dom"

function Principal() {
    
    const[pag, setpag] = useState(1)

    const history = useHistory();

    return (
        <Fragment>

        <Navbar bg="light">
            <Nav variant="tabs" className="mr-auto">
                <Nav.Link href="/personal-recruitment/employees">Empleados</Nav.Link>
                <Nav.Link href="/personal-recruitment/prospects">Prospectos</Nav.Link>
                <Nav.Link href="/personal-recruitment/disincorporated">Desincorporados</Nav.Link>
            </Nav>
            <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
            </Form>
            
        </Navbar>


            <div className="List">
                <table className="table">

                    <table className="table">

                    <thead>
                        <tr className="ColumnTable">
                            <th scope="col"> Nombre </th>
                            <th scope="col"> Apellido </th>
                            <th scope="col"> Departamento </th>
                            <th scope="col"> Fecha de inicio </th>
                            <th scope="col"> Cargo </th>
                            <th scope="col"> Skills </th>
                            <th scope="col"> Opciones </th>
                        </tr>
                    </thead>
                </table>

                </table>
            
                <h5>Seleccione una opción</h5>
            </div>

        </Fragment>
    )
}

export default Principal
