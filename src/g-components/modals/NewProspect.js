import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import '../../styles/Style.css'
import { Container, Form, Button, Row, Col, Alert  } from 'react-bootstrap'

import { createProspectAction } from '../../g-redux/actions/prospectsActions'
import { listCargosAction } from '../../g-redux/actions/cargosActions'

import { useHistory } from 'react-router-dom'

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
  }, 1000)
}

function NewProspect(props) {
  useEffect(() => {
    const list = () => dispatch(listCargosAction())
    list()
  }, [])
  const cargos = useSelector(state => state.cargos.cargos)

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [documento_de_identidad, setdocumento_de_identidad] = useState('') //cambiar
  const [fecha_de_nacimiento, setfecha_de_nacimiento] = useState('')
  const [correo, setcorreo] = useState('')
  const [nacionalidad, setnacionalidad] = useState('')
  const [pais_de_residencia, setpais_de_residencia] = useState('')
  const [telefono, settelefono] = useState('')
  const [celular, setcelular] = useState('')
  const [ubicacion, setubicacion] = useState('')
  const [skills, setSkills] = useState('')
  const [activo, setActivo] = useState(true)
  const [disponible, setDisponible] = useState(true)
  const [cargoId, setCargoId] = useState('')
  const [origen, setorigen] = useState('')
  const [estado_contratacion, setesetado_contratacion] = useState('')
  const [fecha_de_contacto, setfecha_de_contacto] = useState('')
  const [fecha_contratacion_estimada, set_fecha_contratacion_estimanda] = useState('')
  const [file, setFoto] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()

  const [espera, setEspera] = useState(false)
  const [validated, setValidated] = useState(false)
  const [validado, setValidado] = useState(false)

  const submitNewEmployee = async e => {
    e.preventDefault()

    

    ///////////////////////////////////////////////////////////////////
    //                          VALIDACIONES

    if (nombre.trim() === '') {
      //alert('Formulario incompleto: El campo nombre debe ser ingresado')
      setValidated(true)
      return
    }
    if (apellido.trim() === '') {
      //alert('Formulario incompleto: El campo apellido debe ser ingresado')
      setValidated(true)
      return
    }
    if (documento_de_identidad.trim() === '') {
      //alert('Formulario incompleto: El campo documento de identidad debe ser ingresado')
      setValidated(true)
      return
    }
    if (fecha_de_nacimiento.trim() === '') {
      //alert('Formulario incompleto: El campo fecha de nacimiento debe ser ingresado')
      setValidated(true)
      return
    }
    if (correo.trim() === '') {
      //alert('Formulario incompleto: El campo correo personal debe ser ingresado')
      setValidated(true)
      return
    }
    if (nacionalidad.trim() === '') {
      //alert('Formulario incompleto: El campo nacionalidad debe ser ingresado')
      setValidated(true)
      return
    }
    if (pais_de_residencia.trim() === '') {
      //alert('Formulario incompleto: El campo país de residencia debe ser ingresado')
      setValidated(true)
      return
    }
    if (telefono.trim() === '') {
      //alert('Formulario incompleto: El campo teléfono fijo debe ser ingresado')
      setValidated(true)
      return
    }
    if (celular.trim() === '') {
      //alert('Formulario incompleto: El campo teléfono móvil debe ser ingresado')
      setValidated(true)
      return
    }
    if (ubicacion.trim() === '') {
      //alert('Formulario incompleto: El campo ubicación debe ser ingresado')
      setValidated(true)
      return
    }
    if (skills.trim() === '') {
      //alert('Formulario incompleto: El campo skills debe ser ingresado')
      setValidated(true)
      return
    }
    if (origen.trim() === '') {
      //alert('Formulario incompleto: El campo origen debe ser ingresado')
      setValidated(true)
      return
    }
    if (cargoId.trim() === '') {
      //alert('Formulario incompleto: El campo cargo debe ser ingresado')
      setValidated(true)
      return
    }
    if (estado_contratacion.trim() === '') {
      //alert('Formulario incompleto: El campo estado de la contratación debe ser ingresado')
      setValidated(true)
      return
    }
    if (fecha_de_contacto.trim() === '') {
      //alert('Formulario incompleto: El campo fecha de contacto debe ser ingresado')
      setValidated(true)
      return
    }
    if (fecha_contratacion_estimada.trim() === '') {
      //alert('Formulario incompleto: El campo fecha de contratación estimada debe ser ingresado')
      setValidated(true)
      return
    }
    if (!validateEmail(correo)) {
      alert('Formulario inválido: El correo personal debe ser una dirección de correo válida')
      //setValidated(true)
      return
    }
    if (!validatePhone(telefono)) {
      alert('Formulario erróneo: El campo teléfono no es válido. Asegúrese de que posea el prefijo internacional')
      //setValidated(true)
      return
    }
    if (!validatePhone(celular)) {
      alert('Formulario erróneo: El campo celular no es válido. Asegúrese de que posea el prefijo internacional')
      //setValidated(true)
      return
    }


    setDisponible(eval(disponible))
    setActivo(eval(activo))

    setEspera(true)

    /////////////////////////////////////////////////////////////////
    //si no hay errores
    //crear el nuevo empleado
    await dispatch(
      createProspectAction({
        nombre,
        apellido,
        documento_de_identidad,
        fecha_de_nacimiento,
        correo,
        nacionalidad,
        pais_de_residencia,
        telefono,
        celular,
        ubicacion,
        skills,
        activo,
        disponible,
        cargoId,
        origen,
        estado_contratacion,
        fecha_de_contacto,
        fecha_contratacion_estimada
      })
    )
    setEspera(false)
    setValidado(true)
    setTimeout(function () {
      props.setAux(Math.random())
      props.setShow(false)
    }, 1000)

  }

  return (
    <Container className="Contenedor">
      {espera ? <Alert variant="secondary">Espere... </Alert> : null}
      {validado ? <Alert variant="success">Prospecto creado con éxito </Alert> : null}
      <Form  noValidate validated={validated} className="Formulario" onSubmit={submitNewEmployee}>
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
              <Form.Label>Documento de Identidad</Form.Label>
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
              <Form.Label>Fecha de Nacimiento</Form.Label>
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
              <Form.Label>Nacionalidad</Form.Label>
              <Form.Control type="text" value={nacionalidad} onChange={e => setnacionalidad(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                  Por favor indique la nacionalidad
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>País de Residencia</Form.Label>
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
              <Form.Label>Teléfono Fijo</Form.Label>
              <Form.Control type="text" value={telefono} onChange={e => settelefono(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                  Por favor indique el teléfono fijo
              </Form.Control.Feedback>
            </Form.Group>
            
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Teléfono Móvil</Form.Label>
              <Form.Control type="text" value={celular} onChange={e => setcelular(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                  Por favor indique el teléfono movil
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
              <Form.Label>Cargo</Form.Label>
              <Form.Control as="select" value={cargoId} onChange={e => setCargoId(e.target.value)} required>
                <option value={''}>-</option>
                {cargos.map(cargo => (
                  <option value={cargo.id}>{cargo.nombre}</option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                  Por favor indique el cargo
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Estado de la contratación</Form.Label>
              <Form.Control
                as="select"
                value={estado_contratacion}
                onChange={e => setesetado_contratacion(e.target.value)} required
              >
                <option value={''}>-</option>
                <option>Contacto</option>
                <option>Prueba</option>
                <option>Seleccionado para entrevista</option>
                <option>Seleccionado para cargo</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                  Por favor indique el estado de la contratación
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Origen</Form.Label>
              <Form.Control as="select" value={origen} onChange={e => setorigen(e.target.value)} required>
                <option value={''}>-</option>
                <option>Referido</option>
                <option>Correo</option>
                <option>LinkedIn</option>
                <opcion>Facebook</opcion>
                <option>Twitter</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                  Por favor indique el origen
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Fecha de contratación estimada</Form.Label>
              <Form.Control
                type="date"
                value={fecha_contratacion_estimada}
                onChange={e => set_fecha_contratacion_estimanda(e.target.value)} required
              />
              <Form.Control.Feedback type="invalid">
                  Por favor indique la fecha de contratación estimada
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Correo Personal</Form.Label>
              <Form.Control type="email" value={correo} onChange={e => setcorreo(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                  Por favor indique el correo personal
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Disponibilidad</Form.Label>
              <Form.Control as="select" value={disponible} onChange={e => setDisponible(e.target.value)} required>
                <option value={null}>-</option>
                <option value={0 === 0}>Disponible</option>
                <option value={1 === 0}>No disponible</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                  Por favor indique la disponibilidad
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" value={activo} onChange={e => setActivo(e.target.value)} required>
                <option value={''}>-</option>
                <option value={0 === 0}>Activo</option>
                <option value={1 === 0}>Desincorporado</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                  Por favor indique el status
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
            <Form.Group>
              <Form.Label>Fecha de contacto</Form.Label>
              <Form.Control
                type="date"
                value={fecha_de_contacto}
                onChange={e => setfecha_de_contacto(e.target.value)} required
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
                  Por favor indique la fecha de contacto
                </Form.Control.Feedback>
          </Col>
        </Row>
        <Row>
          <Col>
            {espera ? null : (
              <>
              <Button variant="primary" type="submit">
                Crear
              </Button>
              <Button variant="secondary ml-2" onClick={() => props.setShow(false)}>
              Atrás
              </Button>
              </>
            )}
          </Col>
          <Col></Col>
        </Row>
      </Form>
    </Container>
  )
}

export default NewProspect
