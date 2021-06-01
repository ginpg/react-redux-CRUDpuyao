import React, {useState, Fragment} from 'react'
import { Modal, Button, Col, Row} from 'react-bootstrap';
import {incorporateEmployeeAction} from '../../g-redux/actions/disincorporatedActions'
import {incorporateProspectAction} from '../../g-redux/actions/disincorporatedActions'
import {selectEmployeeToEditAction, fromEmployeeAction} from '../../g-redux/actions/employeesActions'
import {selectProspectToEditAction, fromProspectAction} from '../../g-redux/actions/prospectsActions'

import Incorporate from '../modals/Incorporate'
import EditEmployee from '../modals/EditEmployee'
import EditProspect from '../modals/EditProspect'
import DetailsDis from '../modals/DetailsDis'

import { useDispatch } from "react-redux";
import { useHistory} from 'react-router-dom'

import Updateicon from '../../assets/images/Update.png'
import Menuicon from '../../assets/images/menu.png'

const A_disincorporated = ({whoever})=> {

    const id = whoever.id;
    const tag = whoever.tag;

    var fecha;
    var cargo;
    var departamento;

    //console.log(whoever)

    if (tag === "empleado"){ 
        fecha = whoever.fecha_de_ingreso;
        cargo = whoever.cargo;
        departamento = whoever.departamento;
    }else{
        fecha = whoever.fecha_contratacion_estimada;
        cargo = "N.A";
        departamento = "N.A";        
    }

    const dispatch = useDispatch();
    const history = useHistory();

    //redirige de forma programada
    const redireccionarEdicion = whoever => {
        {tag === 'empleado'
        ? dispatch( selectEmployeeToEditAction(whoever))
        : dispatch( selectProspectToEditAction(whoever))
        }
        {tag === 'empleado'
        ? dispatch(fromEmployeeAction('dis'))
        : dispatch(fromProspectAction('dis'))
        }
        {tag === 'empleado'
        ? history.push(`/personal-recruitment/employees/edit/${whoever.id}`)
        : history.push(`/personal-recruitment/prospects/edit/${whoever.id}`)
        }
        
        //handleShowEdit(true); 
    }


    const incorporate = ({id, tag}) =>{
        {tag === "empleado"
        ? dispatch(incorporateEmployeeAction(id))
        : dispatch(incorporateProspectAction(id))
        }
        setShowIn(false)
        setShowMenu(false)

    }
    const [showMenu, setShowMenu] = useState(false);
    const handleCloseMenu = () => setShowMenu(false);
    const handleShowMenu = () => setShowMenu(true);


    const [showIn, setShowIn] = useState(false);
    const handleCloseIn = () => setShowIn(false);
    const handleShowIn = () => setShowIn(true);

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const [showDetails, setShowDetails] = useState(false);
    const handleCloseDetails = () => setShowDetails(false);
    const handleShowDetails = () => setShowDetails(true);

    return (
        <Fragment>
        <tr className="hover-color-skyblue">
            <td onClick={handleShowDetails} className="celda">{whoever.nombre}</td>
            <td onClick={handleShowDetails} className="celda">{whoever.apellido}</td>
            <td onClick={handleShowDetails} className="celda">{departamento}</td>
            <td onClick={handleShowDetails} className="celda">{fecha}</td>
            <td onClick={handleShowDetails} className="celda">{cargo}</td>
            <td onClick={handleShowDetails} className="celda">{whoever.skills}</td>
            <td className="acciones">
                
                {/*< button type="button" className="btn btn-info mr-2" onClick={handleShowDetails} >Ver</button>*/}

                <button
                    type="button"
                    className="btn btn-default btn-xs hover-color-bluer"
                    onClick={() => redireccionarEdicion(whoever)}>
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

        <Modal show={showIn} onHide={handleCloseIn}>
            <Modal.Header closeButton> <Modal.Title>Incorporar</Modal.Title></Modal.Header>
            <Modal.Body><Incorporate  nombre={whoever.nombre}/> </Modal.Body>
            <Modal.Footer>
                <Button 
                    variant="success" 
                    onClick={ () => incorporate({id, tag})}
                    > 
                    Incorporate
                </Button>
            </Modal.Footer>
        </Modal>

        <Modal size="lg" show={showEdit} onHide={handleCloseEdit}>
            {tag === "empleado"
            ?   <Fragment>
                    <Modal.Header closeButton> <Modal.Title> Editar empleado </Modal.Title></Modal.Header>
                    <Modal.Body><EditEmployee/></Modal.Body>
                </Fragment>
            :   <Fragment>
                    <Modal.Header closeButton> <Modal.Title> Editar prospecto</Modal.Title></Modal.Header>
                    <Modal.Body><EditProspect/></Modal.Body>               
                </Fragment>
            }
            <Modal.Footer>
            </Modal.Footer>

        </Modal>

        <Modal  show={showDetails} onHide={handleCloseDetails}>
            <Modal.Header closeButton> <Modal.Title> Detalles del desincorporado</Modal.Title></Modal.Header>
            <Modal.Body><DetailsDis whoever={whoever}/> </Modal.Body>
       </Modal>

       <Modal size="sm" show={showMenu} onHide={handleCloseMenu}>
                <Modal.Header closeButton> <Modal.Title> Opciones</Modal.Title></Modal.Header>
                <Modal.Body> 
                <table width="100%">
                    <tbody>
                    <tr className="hover-color-skyblue">
                     <td className="celda" onClick={handleShowIn}>Incorporar</td>
                    </tr>
                    </tbody>
                </table>
                </Modal.Body>
        </Modal>
       </Fragment>
    )
};
export default A_disincorporated;
