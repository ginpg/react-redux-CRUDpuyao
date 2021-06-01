import React, { useState, Fragment, useEffect } from 'react'
import { Modal, Button, Col, Row } from 'react-bootstrap';
import '../../styles/Style.css'
import DetailsProject from '../modals/DetailsProject'
import ModalProject from '../modals/ModalProject'

//import { selectpausadoToEditAction } from "../../g-redux/actions/pausadosActions";

import { selectActivoToEditAction, fromActivoAction} from '../../g-redux/actions/activosActions'

import { useDispatch } from "react-redux";

import { useHistory } from "react-router-dom"

import IMG from './Logo_Shokworks.png';

import Updateicon from '../../assets/images/Update.png'
import Menuicon from '../../assets/images/menu.png'


const Pausado = ({ pausado }) => {

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
    const [showC, setShowC] = useState(false);
    const handleCloseC = () => setShowC(false);
    const handleShowC = () => setShowC(true);

    //state y handlers para modalles detalles
    const [showD, setShowD] = useState(false);
    const handleCloseD = () => setShowD(false);
    const handleShowD = () => setShowD(true);


    //redirige de forma programada
    const redireccionarEdicion = project => {
        dispatch(selectActivoToEditAction(project))
        dispatch(fromActivoAction('pausados'))
        history.push(`/projects/edit/${project.id}`)
    };



    return (
        <Fragment>
            <tr className="hover-color-skyblue">
                <td onClick={handleShowD} className="celda"><img src={`https://sgp-api-stg.shokworks.io/api/proyectos/image/${pausado.id}`} alt="foto" height="60" width="60"/> </td>
                <td onClick={handleShowD} className="celda">{pausado.nombre}</td>
                <td onClick={handleShowD} className="celda">{pausado.tipo}</td>
                <td onClick={handleShowD} className="celda">{pausado.fecha_inicio}</td>
                <td onClick={handleShowD} className="celda">{pausado.nro_sprints}</td>
                <td onClick={handleShowD} className="celda">{pausado.nro_recursos}</td>
                <td onClick={handleShowD} className="celda">{pausado.categoria}</td>
                <td onClick={handleShowD} className="celda">{pausado.manager}</td>
                <td className="acciones">

                    <button
                            type="button"
                            className="btn btn-default btn-xs hover-color-bluer"
                            onClick={() => redireccionarEdicion(pausado)}>
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

            <Modal show={showA} onHide={handleCloseA}>
                <Modal.Header closeButton> <Modal.Title> Activar proyecto</Modal.Title></Modal.Header>
                <Modal.Body><ModalProject project={pausado} motivo={'activar'} status={'activo'} setShow={setShowA} from={'pausados'} setShowMenu={setShowMenu}/> </Modal.Body>
            </Modal>

            <Modal show={showC} onHide={handleCloseC}>
                <Modal.Header closeButton> <Modal.Title> Cancelar proyecto</Modal.Title></Modal.Header>
                <Modal.Body><ModalProject  project={pausado} motivo={'cancelar'} status={'cancelado'} setShow={setShowC} from={'pausados'} setShowMenu={setShowMenu}/> </Modal.Body>
            </Modal>

            <Modal size='lg' show={showD} onHide={handleCloseD}>
                <Modal.Header closeButton> <Modal.Title> Detalles del proyecto</Modal.Title></Modal.Header>
                <Modal.Body><DetailsProject project={pausado} activo={false}/> </Modal.Body>
            </Modal>

            <Modal size="sm" show={showMenu} onHide={handleCloseMenu}>
                <Modal.Header closeButton> <Modal.Title> Opciones</Modal.Title></Modal.Header>
                <Modal.Body> 
                
                <table width="100%">
                    <tbody>
                    <tr className="hover-color-skyblue">
                     <td className="celda" onClick={handleShowA}>Activar</td>
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

export default Pausado


