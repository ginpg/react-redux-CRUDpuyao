import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";

import '../../styles/Style.css'
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import Flecha from '../../assets/images/flecha-izquierda.png'

import {listCargosAction} from '../../g-redux/actions/cargosActions'
import {listDepartamentosAction} from '../../g-redux/actions/dtosActions'

import { useHistory} from 'react-router-dom'

import {editEmployeeAction, toReloadEmployeeAction} from '../../g-redux/actions/employeesActions'


function validateEmail(email) {
    var re = /\S+@\S+\.\S+/
    return re.test(email)
  }
  
  function validatePhone(phone) {
    var re = /^\+\d+$/
    return re.test(phone)
  }



function EditEmployee() {


    useEffect( () => {
        const list = () => dispatch(listCargosAction());
        list();

    }, []); 
    const cargos = useSelector( state => state.cargos.cargos);
    
    useEffect( () => {
        const list = () => dispatch(listDepartamentosAction());
        list();

    }, []); 
    const departamentos = useSelector( state => state.departamentos.departamentos);


    const history = useHistory();
    const dispatch = useDispatch();

    const [employee, setEmployee] = useState({
        nombre:'',
        apellido:'',
        documento_de_identidad:'',
        fecha_de_nacimiento:'',
        correo:'',
        correo_empresarial:'',
        nacionalidad:'',
        pais_de_residencia:'',
        telefono:'',
        celular:'',
        ubicacion:'',
        departamento:'',
        metodo_de_pago:'',
        correo_de_pago:'',
        fecha_de_ingreso:'',
        activo:'',
        skills: '',
        file: ''
    });
    const employeee = useSelector(state => state.employees.selected);
    const from = useSelector(state => state.employees.from);
    useEffect(() => {
        setEmployee(employeee);
    }, [employeee]);

    const [primeraEdicion, setPrimeraEdicion] = useState(false)
    

    const onChangeFormulario = e => {
        if (!primeraEdicion){setPrimeraEdicion(true)}
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        })
    }
    const {
        nombre,
        apellido,
        documento_de_identidad,
        fecha_de_nacimiento,
        correo,
        correo_empresarial,
        nacionalidad,
        pais_de_residencia,
        telefono,
        celular,
        ubicacion,
        departamento,
        metodo_de_pago,
        correo_de_pago,
        fecha_de_ingreso,
        skills,
        id,
        activo,
        file
    } = employee;

    const [preview, setPreview] = useState('')

    const extractFile = e => {
        if (!primeraEdicion){setPrimeraEdicion(true)}
        const fileSelector = document.getElementById('foto')
        fileSelector.addEventListener('change', event => {
          const filee = event.target.files[0]
          //console.log(file);
          setEmployee({...employee, file: filee})

          const reader = new FileReader()
          reader.readAsDataURL(filee)
          reader.onload = function () {
            //console.log(reader.result); //image
            //setFoto(reader.result)
            setPreview(reader.result)
          }
    
        })
      }

    const [espere,setEspere] = useState(false)
    const [validated, setValidated] = useState(false)

    const submitEmployee = async e => {
        e.preventDefault();

        // VALIDACIONES 
        if (nombre.trim() === '') {
            alert('Formulario incompleto: El campo nombre debe ser ingresado')
            return
          }
        if (apellido.trim() === '') {
        alert('Formulario incompleto: El campo apellido debe ser ingresado')
        return
        }
        if (documento_de_identidad.trim() === '') {
        alert('Formulario incompleto: El campo documento de identidad debe ser ingresado')
        return
        }
    
        if (correo.trim() === '') {
        alert('Formulario incompleto: El campo correo personal debe ser ingresado')
        return
        }
        if (correo_empresarial.trim() === '') {
        alert('Formulario incompleto: El campo correo institucional debe ser ingresado')
        return
        }
        if (nacionalidad.trim() === '') {
        alert('Formulario incompleto: El campo nacionalidad debe ser ingresado')
        return
        }
        if (pais_de_residencia.trim() === '') {
        alert('Formulario incompleto: El campo pais de residencia debe ser ingresado')
        return
        }
        if (telefono.trim() === '') {
        alert('Formulario incompleto: El campo teléfono debe ser ingresado')
        return
        }
        if (celular.trim() === '') {
        alert('Formulario incompleto: El campo celular debe ser ingresado')
        return
        }
    
        if (ubicacion.trim() === '') {
        alert('Formulario incompleto: El campo ubicación debe ser ingresado')
        return
        }
        if (departamento.trim() === '') {
        alert('Formulario incompleto: El campo departamento debe ser ingresado')
        return
        }
        if (metodo_de_pago.trim() === '') {
        alert('Formulario incompleto: El campo método de pago debe ser ingresado')
        return
        }
        if (correo_de_pago.trim() === '') {
        alert('Formulario incompleto: El campo correo de pago debe ser ingresado')
        return
        }
        if (skills.trim() === '') {
        alert('Formulario incompleto: El campo skills debe ser ingresado')
        return
            }
        if (!validatePhone(telefono)) {
        alert('Formulario erróneo: El campo teléfono fijo no es válido. Asegúrese de que posea el prefijo internacional')
        return
        }
        if (!validatePhone(celular)) {
        alert('Formulario erróneo: El campo teléfono móvil no es válido. Asegúrese de que posea el prefijo internacional')
        return
        }
        if (!validateEmail(correo)) {
        alert('Formulario inválido: El correo personal debe ser una dirección de correo válida')
        return
        }
        if (!validateEmail(correo_empresarial)) {
        alert('Formulario inválido: El correo institucional debe ser una dirección de correo válida')
        return
        }
        if (!validateEmail(correo_de_pago)) {
        alert('Formulario inválido: El correo de pago debe ser una dirección de correo válida')
        return
        }
        if (!validatePhone(telefono)) {
        alert('Formulario erróneo: El campo teléfono no es válido. Asegúrese de que posea el prefijo internacional')
        return
        }
        if (!validatePhone(celular)) {
        alert('Formulario erróneo: El campo celular no es válido. Asegúrese de que posea el prefijo internacional')
        return
        }

        
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
        bodyFormData.append('activo', activo)
        bodyFormData.append('skills', skills)
        bodyFormData.append('file', file)

        setEspere(true)
        //console.log(employee)

        await dispatch(editEmployeeAction(id,bodyFormData));
        setEspere(false) //cuando agrego esta linea
        setValidated(true)
        //console.log(employee)
        await dispatch(toReloadEmployeeAction())
        setTimeout(function () {
            from == 'employee'
                ? history.push('/personal-recruitment/employees/')
                : history.push('/personal-recruitment/disincorporated/')
            }, 1000)
        


    }

    const irAtras = () => {
        {from == 'employee'
            ? history.push('/personal-recruitment/employees/')
            : history.push('/personal-recruitment/disincorporated/')
        }
    }

    return (
        <Container className="Contenedor">
            <>
             
            <h2><Button className="ml-2" variant="btn btn-default btn-xs hover-color-bluer" type="submit" onClick={irAtras} >
                <img src={Flecha} width="25px" height="25px" className="align-top" alt="Go back" />
            </Button> Editar empleado</h2>
            </>
            {espere ? <Alert variant="secondary">Espere... </Alert> : null}
            {validated ? <Alert variant="success">Empleado editado con éxito </Alert> : null}
      
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
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" name="apellido" value={apellido} onChange={onChangeFormulario} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group >
                    <Form.Label>Documento de Identidad</Form.Label>
                    <Form.Control type="text" name="documento_de_identidad" value={documento_de_identidad} onChange={onChangeFormulario}/>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group  >
                    <Form.Label>Fecha de Nacimiento</Form.Label>
                    <Form.Control type="date" name="fecha_de_nacimiento" value={fecha_de_nacimiento} onChange={onChangeFormulario}/>
                    </Form.Group>
                </Col>
            </Row> 
            <Row>
                <Col>
                    <Form.Group >
                    <Form.Label>Correo Personal</Form.Label>
                    <Form.Control type="email" name="correo" value={correo} onChange={onChangeFormulario}/>
                    </Form.Group>               
                </Col>
                <Col>
                    <Form.Group >
                    <Form.Label>Correo Institucional</Form.Label>
                    <Form.Control type="email" name="correo_empresarial" value={correo_empresarial} onChange={onChangeFormulario}/>
                    </Form.Group>                
                </Col>            
            </Row>  
 
            <Row>
                <Col>
                    <Form.Group >
                    <Form.Label>Nacionalidad</Form.Label>
                    <Form.Control type="text" name="nacionalidad" value={nacionalidad} onChange={onChangeFormulario} />
                    </Form.Group>               
                </Col>
                <Col>
                    <Form.Group >
                    <Form.Label>País de Origen</Form.Label>
                    <Form.Control type="text" name="pais_de_residencia" value={pais_de_residencia} onChange={onChangeFormulario}/>
                    </Form.Group>                
                </Col>            
            </Row>  


            <Row>
                <Col>
                    <Form.Group >
                    <Form.Label>Teléfono Fijo</Form.Label>
                    <Form.Control type="text" name="telefono" value={telefono} onChange={onChangeFormulario}/>
                    </Form.Group>               
                </Col>
                <Col>
                    <Form.Group >
                    <Form.Label>Teléfono Móvil</Form.Label>
                    <Form.Control type="text" name="celular" value={celular} onChange={onChangeFormulario}/>
                    </Form.Group>                
                </Col>            
            </Row>  

        
            <Row>
                <Col>
                    <Form.Group >
                    <Form.Label>Ubicación</Form.Label>
                    <Form.Control type="text" name="ubicacion" value={ubicacion} onChange={onChangeFormulario}/>
                    </Form.Group>               
                </Col>
                <Col>
                <Form.Group >
                    <Form.Label>Fecha de ingreso</Form.Label>
                    <Form.Control type="date" name="fecha_de_ingreso" value={fecha_de_ingreso} onChange={onChangeFormulario}/>
                    </Form.Group> 
                {/*
                    <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Departamento</Form.Label>
                    <Form.Control as="select" name="departamento.id" value={departamento.id} onChange={onChangeFormulario}>
                        {departamentos.map( departamento => (
                            <option value={departamento.id}>{departamento.nombre}</option>
                        ))}
                    </Form.Control>
                    </Form.Group> 
                        */}
                </Col>        
            </Row> 

            <Row>
                <Col>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Método de pago</Form.Label>
                        <Form.Control as="select" name="metodo_de_pago" value={metodo_de_pago} onChange={onChangeFormulario}>
                        <option>Banco Americano</option>
                        <option>Paypal</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group >
                    <Form.Label>Correo de pago</Form.Label>
                    <Form.Control type="email" name="correo_de_pago" value={correo_de_pago} onChange={onChangeFormulario}/>
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
                        name="skills"
                        value={skills}
                        onChange={onChangeFormulario}
                    />
                    </Form.Group>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row>
                <Col>
                    {preview===''
                    ?<img src={`https://sgp-api-stg.shokworks.io/api/empleado/image/${id}`} width="200px" height="200px" />
                    :<img src={preview} width="200px" height="200px" />
                    }
                    <Form.Group>
                        <Form.File
                        id="photo"
                        type="file"
                        label="Foto empleado"
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
                    onClick={submitEmployee} disabled>
                    Submit
                    </Button> 
                    :   <Button 
                        variant="primary" 
                        type="submit" 
                        onClick={submitEmployee}>
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
        </Container>
    )
}

export default EditEmployee;