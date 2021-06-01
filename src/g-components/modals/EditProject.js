import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";

import '../../styles/Style.css'
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import Flecha from '../../assets/images/flecha-izquierda.png'

import { useHistory} from 'react-router-dom'

import {editProjectAction, toReloadAction} from '../../g-redux/actions/activosActions'
import {editPausedAction} from '../../g-redux/actions/pausadosActions'
import {editCanceledAction} from '../../g-redux/actions/canceladosActions'

import { listPMAction} from '../../g-redux/actions/employeesActions'



function goBack(path) {
    setTimeout(function () {
        const history = useHistory();
        history.push(path) 
    }, 1000)
  }

function EditProspect() {

    const history = useHistory();
    const dispatch = useDispatch();

  //pidiendo lista de project managers
  useEffect(() => {
    const list = () => dispatch(listPMAction())
    list()
  }, [])
  const managers = useSelector(state => state.employees.managers)

    const[project,setProject] = useState({
        nombre:'',
        nombre_owner:'',
        nombre_producto:'',
        stack_tecnologico:'',
        descripcion:'',
        costo:'',
        tipo:'',
        categoria:'',
        fecha_inicio:'',
        fecha_estimada_culminacion:'',
        fecha_culminacion:'',
        managerId:'',
        semanas_duracion:'',
        nro_sprints:'',
        foto:'',
    });

    
    //producto a editar
    const proyectoEditar = useSelector(state => state.activos.selected);
    const from = useSelector(state => state.activos.from);

    //llena el state
    useEffect(() => {
        setProject(proyectoEditar);
    }, [proyectoEditar]);

    //cambiar entradas
    const [primeraEdicion, setPrimeraEdicion] = useState(false)
    

    const onChangeFormulario = e => {
        if (!primeraEdicion){setPrimeraEdicion(true)}
        setProject({
            ...project,
            [e.target.name]: e.target.value
        })
    }

    let {
        id,
        nombre,
        nombre_owner,
        nombre_producto,
        stack_tecnologico,
        stack,
        descripcion,
        costo,
        tipo,
        categoria,
        fecha_inicio,
        fecha_estimada_culminacion,
        fecha_culminacion,
        managerId,
        semanas_duracion,
        nro_sprints,
        foto
    } = project;

    const [preview, setPreview] = useState('')
    
      //Extraer imagen
    const extractFile = e => {
        if (!primeraEdicion){setPrimeraEdicion(true)}
        const fileSelector = document.getElementById('foto')
        fileSelector.addEventListener('change', event => {
        const file = event.target.files[0]
        //console.log(file);
        setProject({...project, foto: file})

        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          //console.log(reader.result); //image
          //setFoto(reader.result)
          setPreview(reader.result)
        }

        })
    }
    
    const [espere,setEspere] = useState(false)
    const [validated, setValidated] = useState(false)

    const irAtras = () => {
        if (from ==='activos'){ history.push('/projects/active') }
        else if (from ==='pausados') { history.push('/projects/paused') }
        else { history.push('/projects/canceled') }
    }


    const submitProject = async (e) => {
        e.preventDefault();

        //if(typeof stack === 'undefined'){
        stack = stack_tecnologico.tecnologias.toString();
        //}
        if(nombre.trim() === '') {
            alert('Formulario incompleto: El campo nombre debe ser ingresado')
            return
            }
        if(nombre_producto.trim() === '') {
            alert('Formulario incompleto: El campo nombre del producto debe ser ingresado')
            return
            }
        if(nombre_owner.trim() === '') {
          alert('Formulario incompleto: El campo nombre del owner debe ser ingresado')
          return
          }
          if(descripcion.trim() === '') {
            alert('Formulario incompleto: La descripción debe ser ingresada')
            return
            }
        if(categoria.trim() === '') {
            alert('Formulario incompleto: La categoria debe ser ingresada')
            return
            }
        if(tipo.trim() === '') {
            alert('Formulario incompleto: El tipo debe ser ingresado')
            return
            }       
        if(semanas_duracion <=0){
            alert('Formulario erróneo: El campo semanas de duración no puede ser negativo')
            return
        }
        if(nro_sprints <=0){
            alert('Formulario erróneo: El campo número de sprints no puede ser negativo')
            return
        }


        setEspere(true)
        const bodyFormData = new FormData()
        bodyFormData.append('nombre', nombre)
        bodyFormData.append('nombre_owner', nombre_owner)
        bodyFormData.append('nombre_producto', nombre_producto)
        bodyFormData.append('stack_tecnologico', stack.replaceAll(",","").replaceAll(" ", ","))
        bodyFormData.append('descripcion', descripcion)
        bodyFormData.append('costo', costo)
        bodyFormData.append('tipo', tipo)
        bodyFormData.append('categoria', categoria)
        bodyFormData.append('fecha_inicio', fecha_inicio)
        bodyFormData.append('fecha_estimada_culminacion', fecha_estimada_culminacion)
        bodyFormData.append('fecha_culminacion', fecha_culminacion)
        bodyFormData.append('managerId', managerId)
        bodyFormData.append('semanas_duracion', semanas_duracion)
        bodyFormData.append('nro_sprints', nro_sprints)
        //bodyFormData.append('foto', foto)
        bodyFormData.append('file', foto)
        
        
        if (from ==='activos'){ 
            await dispatch(editProjectAction(id,bodyFormData));
            setEspere(false)
            setValidated(true)
            await dispatch(toReloadAction())
            setTimeout(function () {
                history.push('/projects/active')         
              }, 1000)
              
        }
        else if (from ==='pausados') { 
            await dispatch(editPausedAction(id,bodyFormData));
            setEspere(false)
            setValidated(true)
            await dispatch(toReloadAction())
            setTimeout(function () {
                history.push('/projects/paused')          
              }, 1000)
            
        }
        else { 
            await dispatch(editCanceledAction(id,bodyFormData));
            setEspere(false)
            setValidated(true)
            await dispatch(toReloadAction())
            setTimeout(function () {
                history.push('/projects/canceled')         
              }, 1000)
            
        }
    }

    return (
        <Container className="Contenedor">
            <h2><Button className="ml-2" variant="btn btn-default btn-xs hover-color-bluer" type="submit" onClick={irAtras} >
                <img src={Flecha} width="25px" height="25px" className="align-top" alt="Go back" />
            </Button>Editar proyecto</h2>
            {espere ? <Alert variant="secondary">Espere... </Alert> : null}
            {validated ? <Alert variant="success">Proyecto editado con éxito </Alert> : null}
      
            <Form  noValidate validated={validated} className="Formulario">
            <Row>
                <Col> 
                    <Form.Group>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="nombre" value={nombre} onChange={onChangeFormulario}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group >
                    <Form.Label>Nombre del owner</Form.Label>
                    <Form.Control type="text" name="nombre_owner" value={nombre_owner} onChange={onChangeFormulario} />
                    </Form.Group>
                </Col>
            </Row>
          
            <Row>
                <Col> 
                    <Form.Group>
                    <Form.Label>Nombre del producto</Form.Label>
                    <Form.Control type="text" name="nombre_producto" value={nombre_producto} onChange={onChangeFormulario}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group >
                    <Form.Label>Número de sprint</Form.Label>
                    <Form.Control type="Number" min="1" name="nro_sprints" value={nro_sprints} onChange={onChangeFormulario} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col> 
                    <Form.Group>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" name="descripcion" value={descripcion} onChange={onChangeFormulario}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group >
                    <Form.Label>Costo</Form.Label>
                    <Form.Control type="text" name="costo" value={costo} onChange={onChangeFormulario} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col> 
                    <Form.Group>
                    <Form.Label>Tipo</Form.Label>
                    <Form.Control type="text" name="tipo" value={tipo} onChange={onChangeFormulario}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group >
                    <Form.Label>Categoría</Form.Label>
                    <Form.Control type="text" name="categoria" value={categoria} onChange={onChangeFormulario} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col> 
                    <Form.Group>
                    <Form.Label>Fecha de inicio</Form.Label>
                    <Form.Control type="date" name="fecha_inicio" value={fecha_inicio} onChange={onChangeFormulario}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group >
                    <Form.Label>Fecha estimada de culminacion</Form.Label>
                    <Form.Control type="date" name="fecha_estimada_culminacion" value={fecha_estimada_culminacion} onChange={onChangeFormulario} />
                    </Form.Group>
                </Col>
            </Row>

           <Row>
                <Col> 
                    <Form.Group>
                    <Form.Label>Fecha de culminacion</Form.Label>
                    <Form.Control type="date" name="fecha_culminacion" value={fecha_culminacion} onChange={onChangeFormulario}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                    <Form.Label>Semanas de duración</Form.Label>
                    <Form.Control type="Number" min="1" name="semanas_duracion" value={semanas_duracion} onChange={onChangeFormulario}/>
                    </Form.Group>
                {/*
                    <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Project Manager</Form.Label>
                    <Form.Control as="select" name="managerId" value={managerId} onChange={onChangeFormulario}>
                        {managers && managers.map(pm => ( 
                            <option value={pm.empleadoId}>{pm.nombre}</option>))}
                     </Form.Control>
                    </Form.Group>
                */}
                </Col>
            </Row>

            <Row>
                <Col> 
                    {preview===''
                    ?<img src={`https://sgp-api-stg.shokworks.io/api/proyectos/image/${id}`} width="200px" height="200px" />
                    :<img src={preview} width="200px" height="200px" />
                    }
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
                </Col>
                <Col>

                </Col>
            </Row>

            <Row>
                <Col>
                {(espere | !primeraEdicion)
                    ? <Button 
                        variant="primary" 
                        type="submit" 
                        onClick={submitProject} disabled >
                        Submit
                   </Button> 
                    :   <Button 
                        variant="primary" 
                        type="submit" 
                        onClick={submitProject}
                        >
                        Submit
                    </Button> 
                }               
                    <Button 
                        className="ml-2"
                        variant="secondary" 
                        type="submit" 
                        onClick={irAtras} >
                        Cancelar
                    </Button>
                </Col>
                <Col>

                </Col>
            </Row>

            </Form>
        </Container>    )
}

export default EditProspect;