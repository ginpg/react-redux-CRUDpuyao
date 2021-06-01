import React, { useState, Fragment, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap';
import clienteAxios from '../../configuracion_axios/axios';
import '../../styles/Style.css'
import Updateicon from '../../assets/images/Update.png'
import Menuicon from '../../assets/images/menu.png'

import Disincorporate from "../modals/Disincorporate";
import EditEmployee from "../modals/EditEmployee";
import DetailsEmployee from '../modals/DetailsEmployee'

import { selectEmployeeToEditAction, fromEmployeeAction } from "../../g-redux/actions/employeesActions";

import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom"

import IMG from './Logo_Shokworks.png';

const Employee = ({ employee }) => {

    //state y handle, modales

    const [showMenu, setShowMenu] = useState(false);
    const handleCloseMenu = () => setShowMenu(false);
    const handleShowMenu = () => setShowMenu(true);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const [showDetails, setShowDetails] = useState(false);
    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails = () => setShowDetails(true);



    const [foto, setFoto] = useState('');

    //imports
    const dispatch = useDispatch();
    const history = useHistory();


    //redirige de forma programada
    const redireccionarEdicion = employee => {
        dispatch(selectEmployeeToEditAction(employee))
        dispatch(fromEmployeeAction('employee'))
        //handleShowEdit(true); 
        history.push(`/personal-recruitment/employees/edit/${employee.id}`)
    };

    //console.log(employee.skills.replaceAll(",","").replaceAll(" ", ",").split(',',5))
    const arr_skills = employee.skills.replaceAll(",","").replaceAll(" ", ",").split(',',3)
    return (
        <Fragment >
            <tr className="hover-color-skyblue">
                <td onClick={handleShowDetails} className="celda"><img src={`https://sgp-api-stg.shokworks.io/api/empleado/image/${employee.id}`} alt="foto" height="60" width="60" /> </td>
                <td onClick={handleShowDetails} className="celda">{employee.nombre}</td>
                <td onClick={handleShowDetails} className="celda">{employee.apellido}</td>
                <td onClick={handleShowDetails} className="celda">{employee.departamento}</td>
                <td onClick={handleShowDetails} className="celda">{employee.fecha_de_ingreso}</td>
                <td onClick={handleShowDetails} className="celda">{employee.cargo}</td>
                <td onClick={handleShowDetails} className="celda">{arr_skills.toString() /*.replaceAll(","," ") */}</td>
                <td className="acciones">
                    {/*<button
                        type="button"
                        className="btn btn-info mr-2"
                        onClick={handleShowDetails}
                    >Ver
                    </button>*/}

                    <button
                        type="button"
                        className="btn btn-default btn-xs hover-color-bluer"
                        onClick={() => redireccionarEdicion(employee)}>
                        <img src={Updateicon} width="25px" height="25px" className="align-top" alt="Update icon" />
                </button>

                    <button
                        type="button"
                        className="btn btn-default btn-xs hover-color-bluer"
                        onClick={handleShowMenu}
                    ><img src={Menuicon} width="25px" height="25px" className="align-top" alt="Menu icon" />
                    </button>
                    
                </td>
            </tr>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton> <Modal.Title> Desincorporar empleado</Modal.Title></Modal.Header>
                <Modal.Body><Disincorporate from={"Employees"} employee={employee} prospect={null} setShow={setShow} setShowMenu={setShowMenu}/> </Modal.Body>
            </Modal>

            <Modal size="lg" show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton> <Modal.Title> Editar empleado</Modal.Title></Modal.Header>
                <Modal.Body><EditEmployee /> </Modal.Body>
                <Modal.Footer><Button variant="secondary" onClick={handleCloseEdit}> Salir</Button></Modal.Footer>
            </Modal>


            <Modal size="lg" show={showDetails} onHide={handleCloseDetails}>
                <Modal.Header closeButton> <Modal.Title> Detalles empleado</Modal.Title></Modal.Header>
                <Modal.Body><DetailsEmployee employee={employee} /> </Modal.Body>
                <Modal.Footer><Button variant="secondary" onClick={handleCloseDetails}> Salir</Button></Modal.Footer>
            </Modal>



            <Modal size="sm" show={showMenu} onHide={handleCloseMenu}>
                <Modal.Header closeButton> <Modal.Title> Opciones</Modal.Title></Modal.Header>
                <Modal.Body> 
                <table width="100%">
                    <tbody>
                    <tr className="hover-color-skyblue">
                     <td className="celda" onClick={handleShow}>Desincorporar</td>
                    </tr>
                    </tbody>
                </table>
                </Modal.Body>
            </Modal>


        </Fragment>

    )
}

export default Employee


