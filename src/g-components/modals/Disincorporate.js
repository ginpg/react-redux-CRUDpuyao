import React, { Fragment, useState } from 'react'
import { Form, Button } from 'react-bootstrap'

import { disincorporateEmployeeAction } from '../../g-redux/actions/employeesActions'
import { disincorporateProspectAction } from '../../g-redux/actions/prospectsActions'

import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

function refresh() {
  setTimeout(function () {
    window.location.reload()
  }, 1000)
}

function Disincorporate({ from, employee, prospect, setShow, setShowMenu }) {
  var nombre = ''
  var id = ''

  if (from === 'Employees') {
    nombre = employee.nombre
    id = employee.id
  } else {
    nombre = prospect.nombre
    id = prospect.id
  }

  const dispatch = useDispatch()
  const history = useHistory()

  const disincorporateProspect = ({ id, motivo, observaciones }) => {
    if (motivo.trim() === '') {
      alert('Formulario incompleto: El motivo debe ser ingresado')
      return
    }
    if (observaciones.trim() === '') {
      alert('Formulario incompleto: La observación debe ser ingresada')
      return
    }
    dispatch(disincorporateProspectAction({ id, motivo, observaciones }))
    setShow(false)
    setShowMenu(false)
  }

  const disincorporateEmployee = ({ id, motivo, observaciones }) => {
    if (motivo.trim() === '') {
      alert('Formulario incompleto: El motivo debe ser ingresado')
      return
    }
    if (observaciones.trim() === '') {
      alert('Formulario incompleto: La observación debe ser ingresada')
      return
    }
    dispatch(disincorporateEmployeeAction({ id, motivo, observaciones }))
    setShow(false)
    setShowMenu(false)
  }

  const [motivo, setMotivo] = useState('')
  const [observaciones, setObservacion] = useState('')
  return (
    <Fragment>
      {from === 'Employees' ? (
        <Fragment>
          <p>¿Seguro que quiere desincorporar a {nombre} de la lista de empleados?</p>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Indique el motivo</Form.Label>
            <Form.Control as="select" value={motivo} onChange={e => setMotivo(e.target.value)}>
              <option>-</option>
              <option>Renuncia voluntaria</option>
              <option>Despido</option>
              <option>Fallecimiento</option>
              <option>Incapacitación</option>
              <option>Contrato sin renovar</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Observaciones</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows={2}
              value={observaciones}
              onChange={e => setObservacion(e.target.value)}
            />
          </Form.Group>
          <Button variant="danger" onClick={() => disincorporateEmployee({ id, motivo, observaciones })}>
            Desincorporar
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <p>¿Seguro que quiere desincorporar a {nombre} de la lista de prospectos?</p>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Indique el motivo</Form.Label>
            <Form.Control as="select" value={motivo} onChange={e => setMotivo(e.target.value)}>
              <option>-</option>
              <option>Fallecimiento</option>
              <option>Incumplimiento de condiciones</option>
              <option>Rechazo de contrato</option>
            </Form.Control>
            <Form.Group>
              <Form.Label>Observaciones</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                rows={2}
                value={observaciones}
                onChange={e => setObservacion(e.target.value)}
              />
            </Form.Group>
          </Form.Group>
          <Button variant="danger" onClick={() => disincorporateProspect({ id, motivo, observaciones })}>
            Desincorporar
          </Button>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Disincorporate
