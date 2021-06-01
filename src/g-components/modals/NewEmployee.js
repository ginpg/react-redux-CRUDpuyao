import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import '../../styles/Style.css'
import { Container, Form, Button, Row, Col, Modal, Alert } from 'react-bootstrap'

import { createEmployeeAction } from '../../g-redux/actions/employeesActions'
import { listCargosAction } from '../../g-redux/actions/cargosActions'
import { listDepartamentosAction } from '../../g-redux/actions/dtosActions'

import { useHistory } from 'react-router-dom'

import IMG from './Logo_Shokworks.png'

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/
  return re.test(email)
}

function validatePhone(phone) {
  var re = /^\+\d+$/
  return re.test(phone)
}

function refresh() {
  setTimeout(function () {
    window.location.reload()
  }, 100)
}

function NewEmployee(props) {
  const mostrar = false

  useEffect(() => {
    const list = () => dispatch(listCargosAction())
    list()
  }, [])
  const cargos = useSelector(state => state.cargos.cargos)

  useEffect(() => {
    const list = () => dispatch(listDepartamentosAction())
    list()
  }, [])
  const departamentos = useSelector(state => state.departamentos.departamentos)
  


  //States de las entradas con sus state/disparadores de modales
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [documento_de_identidad, setdocumento_de_identidad] = useState('') //cambiar
  const [fecha_de_nacimiento, setfecha_de_nacimiento] = useState('')
  const [correo, setcorreo] = useState('')
  const [correo_empresarial, setcorreo_empresarial] = useState('')
  const [nacionalidad, setnacionalidad] = useState('')
  const [pais_de_residencia, setpais_de_residencia] = useState('')
  const [telefono, settelefono] = useState('')
  const [celular, setcelular] = useState('')
  const [ubicacion, setubicacion] = useState('')
  const [departamento, setdepartamento] = useState('')
  const [metodo_de_pago, setmetodo_de_pago] = useState('')
  const [correo_de_pago, setcorreo_de_pago] = useState('')
  const [fecha_de_ingreso, setfecha_de_ingreso] = useState('')
  const [cargoId, setCargoId] = useState('')
  const [fecha_inicio_contrato, setfecha_inicio_contrato] = useState('')
  const [fecha_fin_contrato, setfecha_fin_contrato] = useState('')
  const [skills, setSkills] = useState('')
  const [activo, setActivo] = useState(true)
  const [file, setFoto] = useState('')

  const [preview, setPreview] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  const extractFile = e => {
    const fileSelector = document.getElementById('foto')
    fileSelector.addEventListener('change', event => {
      const file = event.target.files[0]
      //console.log(file);
      setFoto(file)

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        //console.log(reader.result); //image
        //setFoto(reader.result)
        setPreview(reader.result)
      }
    })
  }

  const [espera, setEspera] = useState(false)
  const [validated, setValidated] = useState(false)
  const [validado, setValidado] = useState(false)
  //Enviar formulario
  const submitNewEmployee = async e => {
    e.preventDefault()

    const bodyFormData = new FormData()
    bodyFormData.append('nombre', nombre)
    bodyFormData.append('apellido', apellido)
    bodyFormData.append('documento_de_identidad', documento_de_identidad)
    bodyFormData.append('fecha_de_nacimiento', fecha_de_nacimiento)
    bodyFormData.append('correo', correo)
    bodyFormData.append('correo_empresarial', correo_empresarial)
    bodyFormData.append('nacionalidad', nacionalidad)
    bodyFormData.append('pais_de_residencia', pais_de_residencia)
    bodyFormData.append('telefono', telefono)
    bodyFormData.append('celular', celular)
    bodyFormData.append('ubicacion', ubicacion)
    bodyFormData.append('departamento', departamento)
    bodyFormData.append('metodo_de_pago', metodo_de_pago)
    bodyFormData.append('correo_de_pago', correo_de_pago)
    bodyFormData.append('fecha_de_ingreso', fecha_de_ingreso)
    bodyFormData.append('fecha_inicio_contrato', fecha_inicio_contrato)
    bodyFormData.append('fecha_fin_contrato', fecha_fin_contrato)
    bodyFormData.append('activo', activo)
    bodyFormData.append('cargoId', cargoId)
    bodyFormData.append('skills', skills)
    bodyFormData.append('file', file)

    

    //////////////////////////////////////////////////////////////////
    //                  VALIDACIONES

    if (nombre.trim() === '') {
     // alert('Formulario incompleto: El campo nombre debe ser ingresado')
      setValidated(true)
      return
    }
    if (apellido.trim() === '') {
     // alert('Formulario incompleto: El campo apellido debe ser ingresado')
      setValidated(true)
      return
    }
    if (documento_de_identidad.trim() === '') {
     // alert('Formulario incompleto: El campo documento de identidad debe ser ingresado')
      setValidated(true)
      return
    }
    if (fecha_de_nacimiento.trim() === '') {
     // alert('Formulario incompleto: El campo fecha de nacimiento debe ser ingresado')
      setValidated(true)
      return
    }
    if (correo.trim() === '') {
     // alert('Formulario incompleto: El campo correo personal debe ser ingresado')
      setValidated(true)
      return
    }
    if (correo_empresarial.trim() === '') {
     // alert('Formulario incompleto: El campo correo institucional debe ser ingresado')
      setValidated(true)
      return
    }
    if (nacionalidad.trim() === '') {
     // alert('Formulario incompleto: El campo nacionalidad debe ser ingresado')
      setValidated(true)
      return
    }
    if (pais_de_residencia.trim() === '') {
     // alert('Formulario incompleto: El campo pais de residencia debe ser ingresado')
      setValidated(true)
      return
    }
    if (telefono.trim() === '') {
     // alert('Formulario incompleto: El campo teléfono debe ser ingresado')
      setValidated(true)
      return
    }
    if (celular.trim() === '') {
     // alert('Formulario incompleto: El campo celular debe ser ingresado')
      setValidated(true)
      return
    }

    if (ubicacion.trim() === '') {
     // alert('Formulario incompleto: El campo ubicación debe ser ingresado')
      setValidated(true)
      return
    }
    if (departamento.trim() === '') {
     // alert('Formulario incompleto: El campo departamento debe ser ingresado')
      setValidated(true)
      return
    }
    if (cargoId.trim() === '') {
     // alert('Formulario incompleto: El campo cargo debe ser ingresado')
      setValidated(true)
      return
    }
    if (metodo_de_pago.trim() === '') {
     // alert('Formulario incompleto: El campo método de pago debe ser ingresado')
      setValidated(true)
      return
    }
    if (correo_de_pago.trim() === '') {
     // alert('Formulario incompleto: El campo correo de pago debe ser ingresado')
      setValidated(true)
      return
    }
    if (fecha_de_ingreso.trim() === '') {
     // alert('Formulario incompleto: El campo fecha de ingreso debe ser ingresado')
      setValidated(true)
      return
    }
    if (fecha_inicio_contrato.trim() === '') {
     // alert('Formulario incompleto: El campo fecha de inicio de contrato debe ser ingresado')
      setValidated(true)
      return
    }
    if (fecha_fin_contrato.trim() === '') {
     // alert('Formulario incompleto: El campo fecha fin de contrato debe ser ingresado')
      setValidated(true)
      return
    }
    if (skills === '') {
     // alert('Formulario incompleto: Los skills debeb ser ingresados')
      setValidated(true)
      return
    }
    if (file === '') {
      // alert('Formulario incompleto: La foto del empleado debe ser ingresada')
      //setValidated(true)
      //return
    }
    if (!validatePhone(telefono)) {
      alert('Formulario erróneo: El campo teléfono fijo no es válido. Asegúrese de que posea el prefijo internacional')
      //setValidated(true)
      return
    }
    if (!validatePhone(celular)) {
      alert('Formulario erróneo: El campo teléfono móvil no es válido. Asegúrese de que posea el prefijo internacional')
      //setValidated(true)
      return
    }
    if (!validateEmail(correo)) {
      alert('Formulario inválido: El correo personal debe ser una dirección de correo válida')
      //setValidated(true)
      return
    }
    if (!validateEmail(correo_empresarial)) {
      alert('Formulario inválido: El correo institucional debe ser una dirección de correo válida')
      //setValidated(true)
      return
    }
    if (!validateEmail(correo_de_pago)) {
      alert('Formulario inválido: El correo de pago debe ser una dirección de correo válida')
      //setValidated(true)
      return
    }

    setActivo(eval(activo))
    setEspera(true)

    //llamada al backend
    await dispatch(createEmployeeAction(bodyFormData))
    setEspera(false)
    setValidado(true)
    //si no hay error, cerrar modal y mostrar mensaje de exito
    setTimeout(function () {
      props.setAux(Math.random())
      props.setShow(false)
    }, 1000)
    
  }

  return (
    <Container className="Contenedor">
      {espera ?  <Alert variant="secondary">Espere... </Alert> : null}
      {validado ? <Alert variant="success">Empleado creado con éxito </Alert> : null}
      
      <Form  noValidate validated={validated} className="Formulario">
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" value={nombre} onChange={e => setNombre(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                  Por favor indique el nombre
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" value={apellido} onChange={e => setApellido(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                  Por favor indique el apellido
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Documento de identidad</Form.Label>
              <Form.Control
                type="text"
                value={documento_de_identidad}
                onChange={e => setdocumento_de_identidad(e.target.value)} required
              />
              <Form.Control.Feedback type="invalid">
                  Por favor indique el documento de identidad
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Fecha de nacimiento</Form.Label>
              <Form.Control
                type="date"
                value={fecha_de_nacimiento}
                onChange={e => setfecha_de_nacimiento(e.target.value)} required
              />
              <Form.Control.Feedback type="invalid">
                  Por favor indique la fecha de nacimiento
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Correo personal</Form.Label>
              <Form.Control type="email" value={correo} onChange={e => setcorreo(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                  Por favor indique el correo personal
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Correo institucional</Form.Label>
              <Form.Control
                type="email"
                value={correo_empresarial}
                onChange={e => setcorreo_empresarial(e.target.value)} required
              />
              <Form.Control.Feedback type="invalid">
                  Por favor indique el correo institucional
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Nacionalidad</Form.Label>
              <Form.Control type="text" value={nacionalidad} onChange={e => setnacionalidad(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                  Por favor indique la nacionalidad
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>País de residencia</Form.Label>
              <Form.Control
                type="text"
                value={pais_de_residencia}
                onChange={e => setpais_de_residencia(e.target.value)} required
              />
              <Form.Control.Feedback type="invalid">
                  Por favor indique el pais de residencia
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Teléfono fijo</Form.Label>
              <Form.Control type="text" value={telefono} onChange={e => settelefono(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                  Por favor indique el teléfono fijo
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Teléfono móvil</Form.Label>
              <Form.Control type="text" value={celular} onChange={e => setcelular(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                  Por favor indique el teléfono móvil
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Ubicación</Form.Label>
              <Form.Control type="text" value={ubicacion} onChange={e => setubicacion(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                  Por favor indique la ubicación
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Departamento</Form.Label>
              <Form.Control as="select" value={departamento} onChange={e => setdepartamento(e.target.value)} required>
                <option value={''}>-</option>
                {departamentos.map(departamento => (
                  <option value={departamento.id}>{departamento.nombre}</option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                  Por favor indique el departamento
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Método de pago</Form.Label>
              <Form.Control as="select" value={metodo_de_pago} onChange={e => setmetodo_de_pago(e.target.value)} required>
                <option value={''}>-</option>
                <option>Banco Americano</option>
                <option>Paypal</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                  Por favor indique el método de pago
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Correo de pago</Form.Label>
              <Form.Control type="email" value={correo_de_pago} onChange={e => setcorreo_de_pago(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                  Por favor indique el correo de pago
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Fecha de ingreso</Form.Label>
              <Form.Control type="date" value={fecha_de_ingreso} onChange={e => setfecha_de_ingreso(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                  Por favor indique la fecha de ingreso
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Cargo</Form.Label>
              <Form.Control as="select" value={cargoId} onChange={e => setCargoId(e.target.value)} required>
                <option value={''}>-</option>
                {cargos && cargos.map(cargo => <option value={cargo.id}>{cargo.nombre}</option>)}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                  Por favor indique el cargo
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Fecha de inicio de contrato</Form.Label>
              <Form.Control
                type="date"
                value={fecha_inicio_contrato}
                onChange={e => setfecha_inicio_contrato(e.target.value)} required
              />
              <Form.Control.Feedback type="invalid">
                  Por favor indique la fecha de inicio de contrato
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Fecha de fin de contrato</Form.Label>
              <Form.Control
                type="date"
                value={fecha_fin_contrato}
                onChange={e => setfecha_fin_contrato(e.target.value)} required
              />
              <Form.Control.Feedback type="invalid">
                  Por favor indique la fecha fin de contrato
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Skills</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                rows={2}
                value={skills}
                onChange={e => setSkills(e.target.value)} required
              />
              <Form.Control.Feedback type="invalid">
                  Por favor indique los skills
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            {mostrar ? (
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" value={activo} onChange={e => setActivo(e.target.value)} required>
                  <option value={null}>-</option>
                  <option value={0 === 0}>Activo</option>
                  <option value={1 === 0}>Desincorporado</option>
                </Form.Control>
              </Form.Group>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col>
          {file===''
            ?<img src={IMG} width="200px" height="200px" />
            :<img src={preview} width="200px" height="200px" />
            }
            
            <Form>
              <Form.Group>
                <Form.File
                  id="photo"
                  type="file"
                  label="Foto Empleado"
                  id="foto"
                  accept=".jpg, .jpeg, .png"
                  onClick={extractFile}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col></Col>
        </Row>

        <Row>
          <Col>
            {espera ? null : (
              <>
              <Button variant="primary" type="submit" href="/" onClick={submitNewEmployee}>
                Crear
              </Button>
              <Button variant="secondary ml-2" onClick={() => props.setShow(false)}>
              Atrás
              </Button>
              </>
            )}
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default NewEmployee
