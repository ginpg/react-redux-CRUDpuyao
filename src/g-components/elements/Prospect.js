import React, {useState, Fragment} from 'react'
import { Modal, Button, Row, Col} from 'react-bootstrap';
import Disincorporate from '../modals/Disincorporate';
import EditProspect from "../modals/EditProspect";
import Updateicon from '../../assets/images/Update.png'
import Menuicon from '../../assets/images/menu.png'
import Hire from '../modals/Hire'
import '../../styles/Style.css'
import DetailsProspect from '../modals/DetailsProspect'
import { deleteProspectAction, selectProspectToEditAction, fromProspectAction } from '../../g-redux/actions/prospectsActions'

import { useDispatch } from "react-redux";
import { useHistory} from 'react-router-dom'

const Prospect = ({prospect})=> {

    const dispatch = useDispatch();
    const history = useHistory();

    const deleteProspect = prospect => {
        dispatch(deleteProspectAction(prospect.id));
    }


    const redireccionarEdicion = prospect => {
        dispatch( selectProspectToEditAction(prospect))
        dispatch(fromProspectAction('prospect'))
        //handleShowEdit(true); 
        history.push(`/personal-recruitment/prospects/edit/${prospect.id}`)
    }

    const [showMenu, setShowMenu] = useState(false);
    const handleCloseMenu = () => setShowMenu(false);
    const handleShowMenu = () => setShowMenu(true);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const [showHire, setShowHire] = useState(false);
    const handleCloseHire = () => setShowHire(false);
    const handleShowHire = () => setShowHire(true);

    const [showEliminar, setShowEliminar] = useState(false);
    const handleCloseEliminar = () => setShowEliminar(false);
    const handleShowEliminar = () => setShowEliminar(true);

    const [showDetails, setShowDetails] = useState(false);
    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails = () => setShowDetails(true);

    return (
        <Fragment>
        <tr className="hover-color-skyblue">
            <td onClick={handleShowDetails} className="celda">{prospect.nombre}</td>
            <td onClick={handleShowDetails} className="celda">{prospect.apellido}</td>
            <td onClick={handleShowDetails} className="celda">{prospect.fecha_contratacion_estimada}</td>
            <td onClick={handleShowDetails} className="celda">{prospect.cargo}</td>
            <td onClick={handleShowDetails} className="celda">{prospect.skills}</td>
            <td className="acciones">

            {/*<button 
                    type="button"
                    className="btn btn-info mr-2"
            onClick={handleShowDetails}>Ver</button>*/}

                <button
                    type="button"
                    className="btn btn-default btn-xs hover-color-bluer"
                    onClick={() => redireccionarEdicion(prospect)}>
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
            <Modal.Header closeButton> <Modal.Title> Desincorporar prospecto</Modal.Title></Modal.Header>
            <Modal.Body><Disincorporate from={"Prospects"} employee={null} prospect={prospect} setShow={setShow} setShowMenu={setShowMenu}/></Modal.Body>
        </Modal>

        <Modal size="lg" show={showEdit} onHide={handleCloseEdit}>
            <Modal.Header closeButton> <Modal.Title> Editar prospecto </Modal.Title></Modal.Header>
            <Modal.Body><EditProspect setShowEdit={setShowEdit} prospecto={prospect}/></Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>

        <Modal size="lg" show={showHire} onHide={handleCloseHire}>
            <Modal.Header closeButton> <Modal.Title> Contratar prospecto </Modal.Title></Modal.Header>
            <Modal.Body><Hire prospect={prospect} setShowHire={setShowHire} setShowMenu={setShowMenu}/></Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>


        <Modal show={showEliminar} onHide={handleCloseEliminar}>
            <Modal.Header closeButton> <Modal.Title> Eliminar </Modal.Title></Modal.Header>
            <Modal.Body>¿Seguro que desea eliminar a {prospect.nombre}?</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEliminar}> Salir</Button>
            <Button 
                variant="danger" 
                onClick={() => deleteProspect(prospect)}
                >Eliminar</Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showDetails} onHide={handleCloseDetails}>
            <Modal.Header closeButton> <Modal.Title> Detalles del prospecto</Modal.Title></Modal.Header>
            <Modal.Body><DetailsProspect prospect={prospect}/> </Modal.Body>
            <Modal.Footer><Button variant="secondary" onClick={handleCloseDetails}> Salir</Button></Modal.Footer>
       </Modal>


       <Modal size="sm" show={showMenu} onHide={handleCloseMenu}>
                <Modal.Header closeButton> <Modal.Title> Opciones</Modal.Title></Modal.Header>
                <Modal.Body> 
                <table width="100%">
                    <tbody>
                    <tr className="hover-color-skyblue">
                     <td className="celda" onClick={handleShowHire}>Contratar</td>
                    </tr>
                    <tr className="hover-color-skyblue">
                     <td className="celda" onClick={handleShow}>Desincorporar</td>
                    </tr>
                    <tr className="hover-color-skyblue">
                     <td className="celda" onClick={handleShowEliminar}>Eliminar</td>
                    </tr>
                    </tbody>
                </table>
                </Modal.Body>
        </Modal>

       </Fragment>
    )
};
export default Prospect;
