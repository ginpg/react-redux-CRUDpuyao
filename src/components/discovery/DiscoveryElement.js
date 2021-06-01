import React, { useState } from 'react'

// Styles
import '../../styles/Style.css'
import './discoveryStyle.css'
import Updateicon from '../../assets/images/Update.png'
import { Button, Modal } from 'react-bootstrap'

import ReadDiscovery from '../discovery/Modals/ReadDiscovery'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { goUpdatePage } from '../../config/discoveries_redux/actions/ManageDiscoveryActions'

// Redirection
import { useHistory } from 'react-router-dom'

function DiscoveryElement(props) {
  //console.log(props)
  // Get history, and dispatcher
  const dispatch = useDispatch()
  const history = useHistory()

  /* Funciones para mostrar y cerrar la modal de detalles*/
  const [showDetails, setShowDetails] = useState(false)
  const handleCloseDetails = () => setShowDetails(false)
  const handleShowDetails = () => setShowDetails(true)

  // Redirection functions
  const go_Update_Selected = () => dispatch(goUpdatePage(props.discovery, history))

  return (
    <>
      {' '}
      {/**Se alineo todo con align-middle para que el campo este en la mitad de la fila */}
      <tr className="hover-color-skyblue">
        <td onClick={handleShowDetails}>
          {props.discovery.nombre}
        </td>
        <td className="txt-trans" onClick={handleShowDetails}>
          {props.discovery.tipo}
        </td>
        <td onClick={handleShowDetails}>
          {props.discovery.fecha_de_entrega}
        </td>
        <td onClick={handleShowDetails}>
          {props.discovery.costo}
        </td>
        <td onClick={handleShowDetails}>
          {props.discovery.categoria}
        </td>
        <td className="txt-trans" onClick={handleShowDetails}>
          {props.discovery.status}
        </td>

        <td className="align-middle">
          <div id="update" className="">
            <button type="button" className="btn btn-default btn-xs hover-color-bluer" onClick={go_Update_Selected}>
              <img src={Updateicon} width="25px" height="25px" className="align-top" alt="Update icon" />
            </button>
          </div>
        </td>
      </tr>
      {/* Modal para mostrar detalles */}
      <Modal size="lg" show={showDetails} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title> Detalles del discovery</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ReadDiscovery discovery={props.discovery} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DiscoveryElement
