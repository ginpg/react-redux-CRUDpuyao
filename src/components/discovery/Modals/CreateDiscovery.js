import React, { useEffect, useState } from 'react'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { createNewDiscovery } from '../../../config/discoveries_redux/actions/ManageDiscoveryActions'

// Styles
import { Form, Button, Row, Col, Container, Alert } from 'react-bootstrap'

function CreateDiscovery(props) {
  const dispatch = useDispatch()
  //console.log(props)
  // Saber si la form es  valida o no
  const [validated, setValidated] = useState(false)
  
  // Si hay error en uno o varios campos muestra un alert "Por favor verifique los datos"**
  const [errorValidated, setErrorValidated] = useState(false)

  // Variables para saber el valor actual de campos en la form
  const [formTipo, setFormtipo] = useState('pago')
  const [formCosto, setFormCosto] = useState('')

  // Variable para saber si el discovery es gratis o no
  const [free, setFree] = useState(false)

  // Variables para habilitar y deshabilitar el boton de Crear
  const [button, setButton] = useState(true)

 // Funciones para cambiar el valor de los campos de la form
 const onChangeFormTipo = e => {
  setFormtipo(e.target.value)
  handleInputChange(e)
  if (e.target.value === 'gratis') {
    setFormCosto(0)                   // Si es gratis se coloca automaticamentecosto 0
    setFree(true)                     // Entonces es true y deshabilita el campo costo
  }else{
    setFree(false)
    setFormCosto('')                // En caso que cambie de "gratis" con un costo 0 a "pago" 
  }                                 // limpie el campo
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

const handleInputChange = (evento) => {
  const value =evento.target.value;
  console.log(value)
  if(value !== ''){
    console.log('VACIO')
    setButton(false)
    console.log(button)
  }else{
    setButton(true)
  } 
}
  // Handle the submit of the form
  const handleSubmit = async event => {
    event.preventDefault()
    console.log('Summiting create discovery form calling dispatcher')
    const form = event.currentTarget
    var formError = false                // validar si el form tiene algun error

    if (form.checkValidity() === false) {
      event.stopPropagation()
      formError = true                       
      console.log('stop')
      setErrorValidated(true)
    }

    setValidated(true)         

    //Pasa a llenar los datos siempre y cuando no haya error en el form
    if(formError === false){
      console.log('todo bien')
      const bodyFormData = new FormData()

      bodyFormData.append('nombre', form.nombre.value)
      bodyFormData.append('fecha_de_entrega', form.fecha_ini.value)
      bodyFormData.append('tipo', formTipo)
      bodyFormData.append('costo', formCosto)
      bodyFormData.append('categoria', form.categoria.value)
      bodyFormData.append('managerId', 1)
      bodyFormData.append('fecha_inicio', form.fecha_ini.value)

      console.log('Body form data from creating a modal')
      console.log(bodyFormData)

      await dispatch(createNewDiscovery(bodyFormData))
      props.handleCloseCreateModal()
    }
  }
  return (
    <>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="Formulario">
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="nombre" onChange = {handleInputChange} required />
                <Form.Control.Feedback type="invalid">
                  Por favor indique el nombre del discovery
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Fecha de Inicio</Form.Label>
                <Form.Control type="date" name="fecha_ini" onChange = {handleInputChange} required />
                <Form.Control.Feedback type="invalid">
                  Debe seleccionar una fecha de inicio
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Tipo</Form.Label>
                <Form.Control as="select" name="tipo" onChange={onChangeFormTipo} required>
                  <option value="pago">Pago</option>
                  <option value="gratis">Gratis</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Debe seleccionar una opción
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Costo (USD)</Form.Label>      {/** Se deshabilita el campo si es gratis */}
                {free ? (
                    <>
                    <Form.Control
                    aria-describedby="basic-addon1"
                    type="number"
                    name="costo"
                    value={formCosto}
                    disabled /></>
                ): (
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
                      <Form.Control.Feedback type="invalid">
                      Debe introducir el costo
                      </Form.Control.Feedback>
                  </>
                )}
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Categoría</Form.Label>
                <Form.Control type="text" name="categoria" onChange = {handleInputChange} required />
                <Form.Control.Feedback type="invalid">
                  Por favor coloque una categoría válida
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" defaultValue="pendiente" name="status" disabled>
                  <option value="activo">Activo</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="cancelado">Cancelado</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col>
          {errorValidated ? (
            <><Alert variant="danger">Por favor verifique los datos</Alert>
            
            </>
            ) : validated ? (
            <>
            <Alert variant="success">Discovery creado exitosamente</Alert>
            </>
            ) : null}
            </Col>
          </Row>
          <hr/>
          {button ? 
          (<><Button type="submit" disabled >Crear</Button></>) 
          : (<><Button type="submit">Crear</Button></>)}
          {'  '}
          <span className="float-right">
          <Button variant="secondary" onClick={props.handleCloseCreateModal}>Cerrar{' '}</Button>
          </span>
        </Form>
      </Container>
    </>
  )
}

export default CreateDiscovery
