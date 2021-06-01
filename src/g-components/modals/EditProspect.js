import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";

import '../../styles/Style.css'
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import Flecha from '../../assets/images/flecha-izquierda.png'

import { useHistory} from 'react-router-dom'

import {editProspectAction, toReloadAction} from '../../g-redux/actions/prospectsActions'

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/
    return re.test(email)
  }
  
  function validatePhone(phone) {
    var re = /^\+\d+$/
    return re.test(phone)
  }

function EditProspect() {

    const history = useHistory();
    const dispatch = useDispatch();

    const[prospect,setProspect] = useState({
        nombre:'',
        apellido:'',
        nacionalidad:'',
        fecha_de_nacimiento:'',
        telefono:'',
        celular:'',
        estado_contratacion:'',
        origen:'',
        fecha_contratacion_estimada:'',
        correo:'',
        disponible:'',
        activo:'',
        fecha_de_contacto:''
    });

    //producto a editar
    const prospectoEditar = useSelector(state => state.prospects.selected);
    const from = useSelector(state => state.prospects.from);

    //llena el state
    useEffect(() => {
        setProspect(prospectoEditar);
    }, [prospectoEditar]);

    //Lee el dato del formulario
    const [primeraEdicion, setPrimeraEdicion] = useState(false)
    

    const onChangeFormulario = e => {
        if (!primeraEdicion){setPrimeraEdicion(true)}
        setProspect({
            ...prospect,
            [e.target.name]: e.target.value
        })
    }

    //console.log(prospect)

    //extrayendo
    const   {nombre,
        apellido,
        nacionalidad,
        fecha_de_nacimiento,
        telefono,
        celular,
        estado_contratacion,
        origen,
        fecha_contratacion_estimada,
        correo,
        disponible,
        activo,
        fecha_de_contacto} = prospect


    const [espere,setEspere] = useState(false)
    const [validated, setValidated] = useState(false)

    const submitProspect =  async e => {
        e.preventDefault();

        if (nombre.trim() === '') {
            alert('Formulario incompleto: El campo nombre debe ser ingresado')
            return
          }
          if (apellido.trim() === '') {
            alert('Formulario incompleto: El campo apellido debe ser ingresado')
            return
          }
          if (fecha_de_nacimiento.trim() === '') {
            alert('Formulario incompleto: El campo fecha de nacimiento debe ser ingresado')
            return
          }
          if (correo.trim() === '') {
            alert('Formulario incompleto: El campo correo personal debe ser ingresado')
            return
          }
          if (nacionalidad.trim() === '') {
            alert('Formulario incompleto: El campo nacionalidad debe ser ingresado')
            return
          }
          if (telefono.trim() === '') {
            alert('Formulario incompleto: El campo teléfono fijo debe ser ingresado')
            return
          }
          if (celular.trim() === '') {
            alert('Formulario incompleto: El campo teléfono móvil debe ser ingresado')
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
        
        setEspere(true)
        await dispatch(editProspectAction(prospect));
        setEspere(false)
        setValidated(true)
        await dispatch(toReloadAction())
        setTimeout(function () {
            from == 'prospect'
            ? history.push('/personal-recruitment/prospects/')
            : history.push('/personal-recruitment/disincorporated/')           
          }, 1000)

    }

    const irAtras = () => {
        from == 'prospect'
            ? history.push('/personal-recruitment/prospects/')
            : history.push('/personal-recruitment/disincorporated/')
        
    }

    return (
        <Container className="Contenedor">
            <h2><Button className="ml-2" variant="btn btn-default btn-xs hover-color-bluer" type="submit" onClick={irAtras} >
                <img src={Flecha} width="25px" height="25px" className="align-top" alt="Go back" />
            </Button>Editar prospecto</h2>
            {espere ? <Alert variant="secondary">Espere... </Alert> : null}
            {validated ? <Alert variant="success">Prospecto editado con éxito </Alert> : null}
      
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
                    <Form.Label>Nacionalidad</Form.Label>
                    <Form.Control type="text" name="nacionalidad" value={nacionalidad} onChange={onChangeFormulario} />
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
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Estado de la contratación</Form.Label>
                        <Form.Control as="select" name="estado_contratacion" value={estado_contratacion} onChange={onChangeFormulario}>
                        <option>Contacto</option>
                        <option>Prueba</option>
                        <option>Seleccionado para entrevista</option>
                        <option>Seleccionado para cargo</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Origen</Form.Label>
                        <Form.Control as="select" name="origen" value={origen} onChange={onChangeFormulario}>
                        <option>Referido</option>
                        <option>Correo</option>
                        <option>LinkedIn</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group >
                    <Form.Label>Fecha de contratación estimada</Form.Label>
                    <Form.Control type="date" name="fecha_contratacion_estimada" value={fecha_contratacion_estimada} onChange={onChangeFormulario}/>
                    </Form.Group> 
                </Col>
                <Col>
                    <Form.Group >
                    <Form.Label>Correo Personal</Form.Label>
                    <Form.Control type="email" name="correo" value={correo} onChange={onChangeFormulario}/>
                    </Form.Group>  
                </Col>
            </Row>

  

            <Row>
                <Col>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Disponibilidad</Form.Label>
                        <Form.Control as="select" name="disponible" value={disponible} onChange={onChangeFormulario}>
                        <option value={true}>Disponible</option>
                        <option value={false}>No disponible</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" name="activo" value={activo} onChange={onChangeFormulario}>
                        <option value={true}>Activo</option>
                        <option value={false}>Desincorporado</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                 <Col>
                    <Form.Group >
                    <Form.Label>Fecha de contacto</Form.Label>
                    <Form.Control type="date" name="fecha_de_contacto" value={fecha_de_contacto} onChange={onChangeFormulario}/>
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
                        onClick={submitProspect} disabled>
                        Submit
                    </Button> 
                    :   <Button 
                        variant="primary" 
                        type="submit" 
                        onClick={submitProspect}>
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

export default EditProspect;