import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import '../../styles/Style.css'
import { Container, Form, Button, Row, Col, Alert  } from 'react-bootstrap'

import { createProjectAction } from '../../g-redux/actions/activosActions'
import { listPMAction} from '../../g-redux/actions/employeesActions'

import { useHistory } from 'react-router-dom'

import IMG from './Logo_Shokworks.png'

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/
  return re.test(email)
}


function NewProject(props) {

  //pidiendo lista de project managers
  useEffect(() => {
    const list = () => dispatch(listPMAction())
    list()
  }, [])
  const managers = useSelector(state => state.employees.managers)

  

  const [nombre, setNombre] = useState('')
  const [nombre_owner, setNombreOwner] = useState('')
  const [nombre_producto, setNombreProducto] = useState('')
  const [stack_tecnologico, setStackTecnologico] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [costo, setCosto] = useState('')
  const [tipo, setTipo] = useState('')
  const [categoria, setCategoria] = useState('')
  const [fecha_inicio, setFechaInicio] = useState('')
  const [fecha_estimada_culminacion, setFechaEstimadaCulminacion] = useState('')
  const [fecha_culminacion, setFechaCulminacion] = useState('')
  const [manage_id, setManageId] = useState('')
  const [semanas_duracion, setSemanasDuracion] = useState(1)
  const [nro_sprints, setNroSprints] = useState(1)
  const [file, setFile] = useState('')
  
  const [preview, setPreview] = useState('')

  
  //Extraer imagen
  const extractFile = e => {
    const fileSelector = document.getElementById('foto')
    fileSelector.addEventListener('change', event => {
      const file = event.target.files[0]
      setFile(file)

      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        //console.log(reader.result); //image
        setPreview(reader.result)
      }
    })
  }

  const dispatch = useDispatch()
  const history = useHistory()

  const [espera, setEspera] = useState(false)
  const [validado, setValidado] = useState(false)
  const [validated, setValidated] = useState(false)

  const submitNewProject = async e => {
    e.preventDefault()

    const bodyFormData = new FormData()
    bodyFormData.append('nombre', nombre)
    bodyFormData.append('nombre_owner', nombre_owner)
    bodyFormData.append('nombre_producto', nombre_producto)
    bodyFormData.append('stack_tecnologico', stack_tecnologico.replaceAll(",","").replaceAll(" ", ","))
    bodyFormData.append('descripcion', descripcion)
    bodyFormData.append('costo', costo)
    bodyFormData.append('tipo', tipo)
    bodyFormData.append('categoria', categoria)
    bodyFormData.append('fecha_inicio', fecha_inicio)
    bodyFormData.append('fecha_estimada_culminacion', fecha_estimada_culminacion)
    bodyFormData.append('fecha_culminacion', fecha_culminacion)
    bodyFormData.append('managerId', manage_id)
    bodyFormData.append('semanas_duracion', semanas_duracion)
    bodyFormData.append('nro_sprints', nro_sprints)
    bodyFormData.append('file', file)

    ///////////////////////////////////////////////////////////////////
    //                          VALIDACIONES


    if(nombre.trim() === '') {
        //alert('Formulario incompleto: El campo nombre debe ser ingresado')
        setValidated(true);return
        }
    if(nombre_producto.trim() === '') {
        //alert('Formulario incompleto: El campo nombre del producto debe ser ingresado')
        setValidated(true);return
        }
    if(nombre_owner.trim() === '') {
      //alert('Formulario incompleto: El campo nombre del owner debe ser ingresado')
        setValidated(true);return
      }
    if(stack_tecnologico.trim() === '') {
        //alert('Formulario incompleto: El stack tecnológico nombre debe ser ingresado')
        setValidated(true);return
        }
    if(descripcion.trim() === '') {
        //alert('Formulario incompleto: La descripción nombre debe ser ingresada')
        setValidated(true);return
        }
    if(fecha_inicio.trim() === '') {
        //alert('Formulario incompleto: La fecha de inicio debe ser ingresada')
        setValidated(true);return
        }
    if(costo.trim() === '') {
      //alert('Formulario incompleto: El costo debe ser ingresado')
        setValidated(true);return
      }
    if(categoria.trim() === '') {
      //alert('Formulario incompleto: La categoria debe ser ingresada')
        setValidated(true);return
      }
    if(tipo.trim() === '') {
      //alert('Formulario incompleto: El tipo de proyecto debe ser ingresado')
        setValidated(true);return
      }
    if(fecha_estimada_culminacion.trim() === '') {
        //alert('Formulario incompleto: La fecha estimada de culminación debe ser ingresada')
        setValidated(true);return
        }
    if(fecha_culminacion.trim() === '') {
        //alert('Formulario incompleto: La fecha de culminación debe ser ingresada')
        setValidated(true);return
        }
    if(manage_id.trim() === '') {
        //alert('Formulario incompleto: El campo project manager debe ser ingresado')
        setValidated(true);return
        }
    if(semanas_duracion <=0){
        //alert('Formulario erróneo: El campo semanas de duración no puede ser negativo')
        setValidated(true);return
    }
    if(nro_sprints <=0){
        //alert('Formulario erróneo: El campo número de sprints no puede ser negativo')
        setValidated(true);return
    }
    if(file === '') {
        //alert('Formulario incompleto: Adjunte una imagen')
        //setValidated(true);return
        }

    setEspera(true)

    /////////////////////////////////////////////////////////////////
    //si no hay errores
    //crear el nuevo empleado
    await dispatch(
        createProjectAction(bodyFormData)
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
      {validado ? <Alert variant="success">Proyecto creado con éxito </Alert> : null}
      
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
              <Form.Label>Nombre del producto</Form.Label>
              <Form.Control type="text" value={nombre_producto} onChange={e => setNombreProducto(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                  Por favor indique el nombre del producto
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Stack tecnológico</Form.Label>
              <Form.Control
                type="text"
                value={stack_tecnologico}
                onChange={e => setStackTecnologico(e.target.value)} required
              />
              <Form.Control.Feedback type="invalid">
                  Por favor indique el stack tecnológico
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)} required
              />
              <Form.Control.Feedback type="invalid">
                  Por favor indique la descripción
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Costo (USD)</Form.Label>
              <Form.Control type="text" value={costo} onChange={e => setCosto(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                  Por favor indique el costo
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Fecha de inicio</Form.Label>
              <Form.Control type="date" value={fecha_inicio} onChange={e => setFechaInicio(e.target.value)} required/>
              <Form.Control.Feedback type="invalid">
                  Por favor indique la fecha de inicio
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Tipo</Form.Label>
              <Form.Control type="text" value={tipo} onChange={e => setTipo(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                  Por favor indique el tipo
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Categoría</Form.Label>
              <Form.Control type="text" value={categoria} onChange={e => setCategoria(e.target.value)} required/>
              <Form.Control.Feedback type="invalid">
                  Por favor indique la categoría
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Fecha estimada de culminación</Form.Label>
              <Form.Control type="date" value={fecha_estimada_culminacion} onChange={e => setFechaEstimadaCulminacion(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                  Por favor indique la fecha estimada de culminación
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Fecha de culminación</Form.Label>
              <Form.Control type="date" value={fecha_culminacion} onChange={e => setFechaCulminacion(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                  Por favor indique la culminación
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Semanas de duración</Form.Label>
              <Form.Control type="Number" min="1" value={semanas_duracion} onChange={e => setSemanasDuracion(e.target.value)} required required/>
              <Form.Control.Feedback type="invalid">
                  Por favor indique la semanas de duración
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Project Manager</Form.Label>
              <Form.Control as="select" value={manage_id} onChange={e => setManageId(e.target.value)} required>
                <option value={''}>-</option>
                {managers && managers.map(pm => ( <option value={pm.empleadoId}>{pm.nombre}</option>))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                  Por favor indique el project manager
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Número de Sprints</Form.Label>
              <Form.Control
                type="Number"
                min="1"
                value={nro_sprints}
                onChange={e => setNroSprints(e.target.value)} required
              />
              <Form.Control.Feedback type="invalid">
                  Por favor indique el número de sprints
                </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
          <Form.Group>
              <Form.Label>Nombre del owner</Form.Label>
              <Form.Control type="text" value={nombre_owner} onChange={e => setNombreOwner(e.target.value)} required />
              <Form.Control.Feedback type="invalid">
                  Por favor indique el nombre del owner
                </Form.Control.Feedback>
            </Form.Group>
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
                  label="Logo proyecto"
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
              <Button variant="primary" type="submit" href="/" onClick={submitNewProject}>
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

export default NewProject
