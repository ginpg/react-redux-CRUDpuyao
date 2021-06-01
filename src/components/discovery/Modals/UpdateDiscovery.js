import React, { useEffect, useState } from 'react'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { goActive, goPending, goCanceled } from '../../../config/discoveries_redux/actions/ViewSelectedActions'
import { useHistory } from 'react-router-dom'

// Actions
import { UpdateAction } from '../../../config/discoveries_redux/actions/ManageDiscoveryActions'

// Styles
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap'
import '../../../styles/Style.css'
import Flecha from '../../../assets/images/flecha-izquierda.png'

function UpdateDiscovery() {
  const history = useHistory()
  const dispatch = useDispatch()

  // Get discovery selected info from store
  const discovery = useSelector(state => state.manageDiscovery.discoverySelected)
  console.log('Discovery from store is: -> ', discovery)

  // Saber si la form es  valida o no tambien lo utilice para mostrar un alert "Discovery actualizado exitosamente"**
  const [validated, setValidated] = useState(false)

  // Si hay error en uno o varios campos muestra un alert "Por favor verifique los datos"**
  const [errorValidated, setErrorValidated] = useState(false)

  // Variable para saber si el discovery es gratis o no ***
  const [free, setFree] = useState(false)

  // Variables para saber el valor actual de campos en la form
  const [formTipo, setFormtipo] = useState(discovery.tipo)
  const [formCosto, setFormCosto] = useState(discovery.costo)

  // Variables para validar el motivo del cambio de status y mostrar el textarea
  const [formCanceled, setFormCanceled] = useState(false)

  // Variables para habilitar y deshabilitar el boton de Guardar
  const [button, setButton] = useState(true)

  // Redirection functions
  const go_active_actioned = () => dispatch(goActive(history))
  const go_pending_actioned = () => dispatch(goPending(history))
  const go_canceled_actioned = () => dispatch(goCanceled(history))

  // Para saber que opciones se mostraran en el update modal
  const active_selected_status = useSelector(state => state.viewSelected.active_selected)
  const pending_selected_status = useSelector(state => state.viewSelected.pending_selected)
  const canceled_selected_status = useSelector(state => state.viewSelected.canceled_selected)
  console.log(active_selected_status, pending_selected_status, canceled_selected_status)

  // En caso que este en discoveries cancelados muestre el textarea de una vez
  useEffect(() => {
    if (discovery.status === 'cancelado') {
      setFormCanceled(true)
    }

    if(discovery.tipo === 'gratis'){
      setFree(true)
    }
  }, [])

  // Funciones para cambiar el valor de los campos de la form
  const onChangeFormTipo = e => {
    handleInputChange(e)
    setFormtipo(e.target.value)
    
    if (e.target.value === 'gratis') {
      setFormCosto(0) // Si es gratis se coloca automaticamentecosto 0
      setFree(true) // Entonces es true y deshabilita el campo costo
    } else {
      setFree(false) // En caso que cambie de "gratis" con un costo 0 a "pago"
      setFormCosto('') // limpie el campo
    }
  }

  const onChangeFormCosto = e => {
    handleInputChange(e)
    if (formTipo === 'gratis') {
      setFormCosto(0)
      setFree(true)
    } else {
      setFormCosto(e.target.value)
      setFree(false)
    }
  }

  // Funcion para mostrar el textarea cuando seleccionas 'Cancelado'
  const onChangeFormCanceled = e => {
    console.log(e.target.value)
    console.log(discovery.status)
    handleInputChange(e)
    if (e.target.value === 'cancelado') {
      setFormCanceled(true)
    } else if (discovery.status === 'cancelado' && e.target.value === 'activo') {
      setFormCanceled(true)
    } else {
      setFormCanceled(false)
    }
  }

  const handleInputChange = (evento) => {
    if(evento.target.value !== ''){
      setButton(false)
      setValidated(false)
      setErrorValidated(false)
    }else{
      setButton(true)
    } 
  }

  const goBack = () => {
    if (active_selected_status) {
      go_active_actioned()
    } else {
      if (pending_selected_status) {
        go_pending_actioned()
      } else {
        if (canceled_selected_status) {
          go_canceled_actioned()
        }
      }
    }
  }

  // Handle the submit of the form
  const handleSubmit = event => {
    event.preventDefault()
    setButton(true)
    console.log('Submit UPDATE discovery, calling dispatch')
    const form = event.currentTarget
    var formError = false // validar si el form tiene algun error

    if (form.checkValidity() === false || (formTipo === 'pago' && formCosto < 1)) {
      event.stopPropagation()
      console.log('stop')
      formError = true
      setErrorValidated(true)
    }

    setValidated(true)

    //Pasa a llenar los datos siempre y cuando no haya error en el form
    if (formError === false) {
      console.log('todo nice')
      // Data que se le pasara a la accion para hacer put
      const bodyFormData = new FormData()
      bodyFormData.append('nombre', form.nombre.value)
      bodyFormData.append('fecha_de_entrega', form.fecha_ini.value)
      bodyFormData.append('tipo', formTipo)
      bodyFormData.append('costo', formCosto)
      bodyFormData.append('categoria', form.categoria.value)
      bodyFormData.append('managerId', 1)
      bodyFormData.append('fecha_inicio', form.fecha_ini.value)

      // verificando que haya una nota sino se manda como " "
      var nota = ' '
      if (form.nota) {
        console.log('SI HAY NOTA ES:  ' + form.nota.value)
        nota = form.nota.value
      } else {
        console.log('NO HAY NOTA')
      }

      console.log('Data que se envia desde update   ' + discovery.id + ' ' + form.status.value + ' ' + nota)
      dispatch(UpdateAction(bodyFormData, discovery.id, form.status.value, nota))
    }
  }

  return (
    <>
      <Container className="Contenedor">
          <h2><Button className="ml-2" variant="btn btn-default btn-xs hover-color-bluer" type="submit" onClick={goBack}>
            <img src={Flecha} width="25px" height="25px" className="align-top" alt="Go back" />
          </Button>Editar discovery</h2>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="Formulario">
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="nombre" defaultValue={discovery.nombre} onChange = {handleInputChange} required />
                <Form.Control.Feedback type="invalid">Por favor indique el nombre del discovery</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Fecha de Inicio</Form.Label>
                <Form.Control type="date" name="fecha_ini" defaultValue={discovery.fecha_de_entrega} onChange = {handleInputChange} required />
                <Form.Control.Feedback type="invalid">Debe seleccionar una fecha de inicio</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  as="select"
                  name="tipo"
                  defaultValue={formTipo}
                  value={formTipo}
                  onChange={onChangeFormTipo}
                  required
                >
                  <option value="pago">Pago</option>
                  <option value="gratis">Gratis</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Debe seleccionar una opción</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Costo (USD)</Form.Label> {/** Se deshabilita el campo si es gratis */}
                {free ? (
                  <>
                    <Form.Control
                      aria-describedby="basic-addon1"
                      type="number"
                      name="costo"
                      value={formCosto}
                      disabled
                    />
                  </>
                ) : (
                  <>
                    <Form.Control
                      aria-describedby="basic-addon1"
                      type="number"
                      min="0"
                      name="costo"
                      value={formCosto}
                      onChange={onChangeFormCosto}
                      required
                    />
                    <Form.Control.Feedback type="invalid">Debe introducir el costo</Form.Control.Feedback>
                  </>
                )}
                <Form.Control.Feedback type="invalid">Costo inválido</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Categoría</Form.Label>
                <Form.Control type="text" name="categoria" defaultValue={discovery.categoria} onChange = {handleInputChange} required />
                <Form.Control.Feedback type="invalid">Por favor coloque una categoría válida</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" defaultValue={discovery.status} name="status" onChange={onChangeFormCanceled}>
                  {active_selected_status ? (
                    <>
                      <option value="activo">Activo</option>
                      <option value="cancelado">Cancelado</option>
                    </>
                  ) : pending_selected_status ? (
                    <>
                      <option value="pendiente">Pendiente</option>
                      <option value="activo">Activo</option>
                      <option value="cancelado">Cancelado</option>
                    </>
                  ) : canceled_selected_status ? (
                    <>
                      <option value="cancelado">Cancelado</option>
                      <option value="activo">Activo</option>
                    </>
                  ) : null}
                </Form.Control>
              </Form.Group>

              <Form.Group>
                {formCanceled ? (
                  <>
                    <Form.Label>Motivo de su cambio de status</Form.Label>
                    <Form.Control as="textarea" name="nota" rows={3} defaultValue={discovery.nota} onChange = {handleInputChange} required />
                    <Form.Control.Feedback type="invalid">
                      Por favor indique el motivo del cambio de status
                    </Form.Control.Feedback>
                  </>
                ) : null}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              {errorValidated ? (
                <>
                  <Alert variant="danger">Por favor verifique los datos</Alert>
                </>
              ) : validated ? (
                <>
                  <Alert variant="success">Discovery actualizado exitosamente</Alert>
                </>
              ) : null}
            </Col>
          </Row>
          {button ? 
          (<><Button type="submit" disabled >Guardar</Button></>) 
          : (<><Button type="submit">Guardar</Button></>)}
          {'  '}
          <Button variant="secondary" onClick={goBack}>
            Cancelar{' '}
          </Button>
          {/** <hr/>
          <Button type="submit">Guardar</Button> {'  '}
          <span className="float-right">
          <Button variant="secondary" >Cerrar{' '}</Button>
          </span>*/}
        </Form>
      </Container>
    </>
  )
}
export default UpdateDiscovery
