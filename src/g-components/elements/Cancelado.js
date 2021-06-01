import React, { useState, Fragment, useEffect } from 'react'
import { Modal, Button, Col, Row } from 'react-bootstrap';
import '../../styles/Style.css'
import DetailsProject from '../modals/DetailsProject'
import ModalProject from '../modals/ModalProject'

//import { selectcanceladoToEditAction } from "../../g-redux/actions/canceladosActions";
import { selectActivoToEditAction, fromActivoAction} from '../../g-redux/actions/activosActions'

import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom"

import IMG from './Logo_Shokworks.png';

import Updateicon from '../../assets/images/Update.png'
import Menuicon from '../../assets/images/menu.png'

const Cancelado = ({ cancelado }) => {

    //imports
    const dispatch = useDispatch();
    const history = useHistory();

    const [showMenu, setShowMenu] = useState(false);
    const handleCloseMenu = () => setShowMenu(false);
    const handleShowMenu = () => setShowMenu(true);

    //state y handlers para modalles
    const [showA, setShowA] = useState(false);
    const handleCloseA = () => setShowA(false);
    const handleShowA = () => setShowA(true);

    //state y handlers para modalles
    const [showP, setShowP] = useState(false);
    const handleCloseP = () => setShowP(false);
    const handleShowP = () => setShowP(true);

    //state y handlers para modalles detalles
    const [showD, setShowD] = useState(false);
    const handleCloseD = () => setShowD(false);
    const handleShowD = () => setShowD(true);

    //redirige de forma programada
    const redireccionarEdicion = project => {
        dispatch(selectActivoToEditAction(project))
        dispatch(fromActivoAction('cancelados'))
        history.push(`/projects/edit/${project.id}`)
    };

    return (
        <Fragment>
            <tr className="hover-color-skyblue">
                <td onClick={handleShowD} className="celda"><img src={`https://sgp-api-stg.shokworks.io/api/proyectos/image/${cancelado.id}`} alt="foto" height="60" width="60"/> </td>
                <td onClick={handleShowD} className="celda">{cancelado.nombre}</td>
                <td onClick={handleShowD} className="celda">{cancelado.tipo}</td>
                <td onClick={handleShowD} className="celda">{cancelado.fecha_inicio}</td>
                <td onClick={handleShowD} className="celda">{cancelado.nro_sprints}</td>
                <td onClick={handleShowD} className="celda">{cancelado.nro_recursos}</td>
                <td onClick={handleShowD} className="celda">{cancelado.categoria}</td>
                <td onClick={handleShowD} className="celda">{cancelado.manager}</td>
                <td className="acciones">

                    <button
                            type="button"
                            className="btn btn-default btn-xs hover-color-bluer"
                            onClick={() => redireccionarEdicion(cancelado)}>
                            <img src={Updateicon} width="25px" height="25px" className="align-top" alt="Update icon" />
                    </button>

                    <button
                            type="button"
                            className="btn btn-default btn-xs hover-color-bluer"
                            onClick={handleShowMenu}>
                            <img src={Menuicon} width="25px" height="25px" className="align-top" alt="Menu icon" />
                    </button>

                </td>
            </tr>

            <Modal show={showA} onHide={handleCloseA}>
                <Modal.Header closeButton> <Modal.Title> Activar proyecto</Modal.Title></Modal.Header>
                <Modal.Body><ModalProject project={cancelado} motivo={'activar'} status={'activo'} setShow={setShowA} from={'cancelados'} setShowMenu={setShowMenu}/> </Modal.Body>
            </Modal>


            <Modal size='lg' show={showD} onHide={handleCloseD}>
                <Modal.Header closeButton> <Modal.Title> Detalles del proyecto</Modal.Title></Modal.Header>
                <Modal.Body><DetailsProject project={cancelado} activo={false}/> </Modal.Body>
            </Modal>

            <Modal size="sm" show={showMenu} onHide={handleCloseMenu}>
                <Modal.Header closeButton> <Modal.Title> Opciones</Modal.Title></Modal.Header>
                <Modal.Body> 
                <table width="100%">
                    <tbody>
                    <tr className="hover-color-skyblue">
                     <td className="celda" onClick={handleShowA}>Activar</td>
                    </tr>
                    </tbody>
                </table>
                </Modal.Body>
            </Modal>

        </Fragment>

    )
}

export default Cancelado


