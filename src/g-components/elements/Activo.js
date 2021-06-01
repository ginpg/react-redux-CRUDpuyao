import React, { useState, Fragment, useEffect } from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap';
import clienteAxios from '../../configuracion_axios/axios';
import DetailsProject from '../modals/DetailsProject'
import ModalProject from '../modals/ModalProject'
import '../../styles/Style.css'
import { obtenerProyectoAction, selectActivoToEditAction, fromActivoAction} from '../../g-redux/actions/activosActions'

import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom"

import IMG from './Logo_Shokworks.png';

import Updateicon from '../../assets/images/Update.png'
import Menuicon from '../../assets/images/menu.png'

const Activo = ({ activo }) => {

    //imports
    const dispatch = useDispatch();
    const history = useHistory();

    const [showMenu, setShowMenu] = useState(false);
    const handleCloseMenu = () => setShowMenu(false);
    const handleShowMenu = () => setShowMenu(true);

    //state y handlers para modalles pausar
    const [showP, setShowP] = useState(false);
    const handleCloseP = () => setShowP(false);
    const handleShowP = () => setShowP(true);

    //state y handlers para modalles cancelar
    const [showC, setShowC] = useState(false);
    const handleCloseC = () => setShowC(false);
    const handleShowC = () => setShowC(true);

    //state y handlers para modalles detalles
    const [showD, setShowD] = useState(false);
    const handleCloseD = () => setShowD(false);
    const handleShowD = () => setShowD(true);

    
    function seleccionarProyecto(){
        dispatch(obtenerProyectoAction(activo.id))
        setShowD(true)
    }
    
    //redirige de forma programada
    const redireccionarEdicion = project => {
        dispatch(selectActivoToEditAction(project))
        dispatch(fromActivoAction('activos'))
        history.push(`/projects/edit/${project.id}`)
    };


    return (
        <Fragment>
            <tr className="hover-color-skyblue">
                <td onClick={handleShowD} className="celda"><img src={`https://sgp-api-stg.shokworks.io/api/proyectos/image/${activo.id}`} alt="foto" height="60" width="60"/> </td>
                <td onClick={handleShowD} className="celda">{activo.nombre}</td>
                <td onClick={handleShowD} className="celda">{activo.tipo}</td>
                <td onClick={handleShowD} className="celda">{activo.fecha_inicio}</td>
                <td onClick={handleShowD} className="celda">{activo.nro_sprints}</td>
                <td onClick={handleShowD} className="celda">{activo.nro_recursos}</td>
                <td onClick={handleShowD} className="celda">{activo.categoria}</td>
                <td onClick={handleShowD} className="celda">{activo.manager}</td>
                <td >

                    <button
                            type="button"
                            className="btn btn-default btn-xs hover-color-bluer"
                            onClick={() => redireccionarEdicion(activo)}>
                            <img src={Updateicon} width="25px" height="25px" className="align-top" alt="Update icon" />
                    </button>

                    <button
                            type="button"
                            className="btn btn-default btn-xs hover-color-bluer"
                            onClick={handleShowMenu}>
                            <img src={Menuicon} width="25px" height="25px" className="align-top" alt="Menu icon" />
                    </button>

                    {/*<button type="button" className="btn btn-info mr-2" onClick={handleShowD}>Ver </button>*/}

                </td>
            </tr>

            <Modal show={showP} onHide={handleCloseP}>
                <Modal.Header closeButton> <Modal.Title> Pausar proyecto</Modal.Title></Modal.Header>
                <Modal.Body><ModalProject project={activo} motivo={'pausar'} status={'pausado'} setShow={setShowP} from={'activos'} setShowMenu={setShowMenu}/> </Modal.Body>
            </Modal>

            <Modal show={showC} onHide={handleCloseC}>
                <Modal.Header closeButton> <Modal.Title> Cancelar proyecto</Modal.Title></Modal.Header>
                <Modal.Body><ModalProject project={activo} motivo={'cancelar'} status={'cancelado'} setShow={setShowC} from={'activos'} setShowMenu={setShowMenu}/> </Modal.Body>
            </Modal>

            <Modal size='lg' show={showD} onHide={handleCloseD}>
                <Modal.Header closeButton> <Modal.Title> Detalles del proyecto</Modal.Title></Modal.Header>
                <Modal.Body><DetailsProject project={activo} activo={true}/> </Modal.Body>
            </Modal>

            <Modal size="sm" show={showMenu} onHide={handleCloseMenu}>
                <Modal.Header closeButton> <Modal.Title> Opciones</Modal.Title></Modal.Header>
                <Modal.Body> 
                <table width="100%">
                    <tbody>
                    <tr className="hover-color-skyblue">
                     <td className="celda" onClick={handleShowP}>Pausar</td>
                    </tr>
                    <tr className="hover-color-skyblue">
                     <td className="celda" onClick={handleShowC}>Cancelar</td>
                    </tr>
                    </tbody>
                </table>
                </Modal.Body>
            </Modal>

        </Fragment>

    )
}

export default Activo


