import React, { Fragment, useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import { cambiarStatusAction } from '../../g-redux/actions/activosActions'
import {cambiarStatusPausadoAction} from '../../g-redux/actions/pausadosActions'
import {cambiarStatusCanceladoAction} from '../../g-redux/actions/canceladosActions'

import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'


function ModalProject({from, project, status, motivo, setShow,setShowMenu}) {

  const [nota, setNota] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const id = project.id;
  
  //Llamar al cambio de status
  const cambiarStatus = ({from,id,status,nota}) => {

    //Validar nota no este vacia
    if (nota.trim() === '') {
      alert('Formulario incompleto: El campo nota debe ser ingresado')
      return
    }
    const nota_to_send = {nota: nota};

    //console.log(project);

    if (from === 'activos'){
      dispatch(cambiarStatusAction({ id, status ,nota_to_send }))     
    }
    else if (from === 'pausados'){
      dispatch(cambiarStatusPausadoAction({ id, status, nota_to_send }))  
    }
    else{
      dispatch(cambiarStatusCanceladoAction({ id, status, nota_to_send }))  
    }
    //Cerrando modal
    setShow(false)
    setShowMenu(false)
  } 

  return (
        <Fragment>
          <p>¿Seguro que quiere {motivo} {project.nombre}? </p>
          <Form.Group>
            <Form.Label>Nota</Form.Label>
            <Form.Control type="text" as="textarea" rows={2} value={nota} onChange={e => setNota(e.target.value)}/>
          <Button variant="danger mt-2" onClick={() => cambiarStatus({from,id,status,nota})}>Guardar cambios</Button>
          </Form.Group>
        </Fragment>
      ) 
}

export default ModalProject
