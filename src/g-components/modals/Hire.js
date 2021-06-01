import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";

import '../../styles/Style.css'
import { Container, Form, Button, Row, Col, Alert} from 'react-bootstrap';

//Actions
import {listCargosAction} from '../../g-redux/actions/cargosActions'
import {listDepartamentosAction} from '../../g-redux/actions/dtosActions'
import {hireAction} from '../../g-redux/actions/prospectsActions'

import { useHistory} from 'react-router-dom'

import IMG from './Logo_Shokworks.png'

function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


function Hire({prospect,setShowHire,setShowMenu}) {

    //Listar Cargos y Departamentos
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

    const[departamento, setdepartamento] = useState('');
    const[metodo_de_pago, setmetodo_de_pago] = useState("");
    const[correo_de_pago, setcorreo_de_pago] = useState("");
    const[correo_empresarial, setcorreo_empresarial] = useState("");
    const[fecha_de_ingreso, setfecha_de_ingreso] = useState("");
    const[cargoId, setCargoId] = useState('');
    const[fecha_inicio_contrato, setfecha_inicio_contrato] = useState("");
    const[fecha_fin_contrato, setfecha_fin_contrato] = useState("");
    const[skills, setSkills] = useState("");
    const[file,setFoto] = useState('')


    const[preview, setPreview] = useState('')
    
    const extractFile = e => {
        const fileSelector = document.getElementById('foto');
        fileSelector.addEventListener('change', (event) => {
            const file = event.target.files[0];
            //console.log(file);
            setFoto(file)
            
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                //console.log(reader.result); //image
                setPreview(reader.result)
              }
        });

    }

    const [espera, setEspera] = useState(false)
    const [validated, setValidated] = useState(false)
    const [validado, setValidado] = useState(false)

    const hireProspect = async () =>{
        const id = prospect.id;
    
        const bodyFormData = new FormData()
        bodyFormData.append("departamento",departamento)
        bodyFormData.append("metodo_de_pago",metodo_de_pago)
        bodyFormData.append("correo_de_pago",correo_de_pago)
        bodyFormData.append("correo_empresarial",correo_empresarial)
        bodyFormData.append("fecha_de_ingreso",fecha_de_ingreso)   
        bodyFormData.append("cargoId",cargoId)
        bodyFormData.append("fecha_inicio_contrato",fecha_inicio_contrato)
        bodyFormData.append("fecha_fin_contrato",fecha_fin_contrato)
        bodyFormData.append("skills",skills)
        bodyFormData.append("file",file)
 

        //////////////////////////////////////////////////////////////////
        //                  VALIDACIONES

     
        if (correo_empresarial.trim() === ''){
           // alert('Formulario incompleto: El campo correo institucional debe ser ingresado');
      setValidated(true)
      return
        }
      
        if (departamento.trim() === ''){ 
           // alert('Formulario incompleto: El campo departamento debe ser ingresado');
      setValidated(true)
      return
        }
        if (cargoId.trim() === ''){ 
           // alert('Formulario incompleto: El campo cargo debe ser ingresado');
      setValidated(true)
      return
        }
        if (metodo_de_pago.trim() === ''){ 
           // alert('Formulario incompleto: El campo método de pago debe ser ingresado');
      setValidated(true)
      return
        }
        if (correo_de_pago.trim() === ''){ 
           // alert('Formulario incompleto: El campo correo de pago debe ser ingresado');
      setValidated(true)
      return
        }
        if (fecha_de_ingreso.trim() === ''){ 
           // alert('Formulario incompleto: El campo fecha de ingreso debe ser ingresado');
      setValidated(true)
      return
        }
        if (fecha_inicio_contrato.trim() === ''){ 
           // alert('Formulario incompleto: El campo fecha de inicio de contrato debe ser ingresado');
      setValidated(true)
      return
        }
        if (fecha_fin_contrato.trim() === '' ){            
           // alert('Formulario incompleto: El campo fecha fin de contrato debe ser ingresado');
      setValidated(true)
      return
        }
        if (skills === '' ){            
           // alert('Formulario incompleto: Los skills debeb ser ingresados');
      setValidated(true)
      return
        }
        /*if (file === '' ){            
           // alert('Formulario incompleto: La foto del empleado debe ser ingresada');
      setValidated(true)
      return
        }*/
        if (!validateEmail(correo_empresarial)){
            alert('Formulario inválido: El correo institucional debe ser una dirección de correo válida');
            return
        }
        if (!validateEmail(correo_de_pago)){
            alert('Formulario inválido: El correo de pago debe ser una dirección de correo válida');
            return
        }
        setEspera(true)
        await dispatch(hireAction(prospect.id,bodyFormData));
        setEspera(false)
        setValidado(true)
        setValidated(true)
        //si no hay error, cerrar modal y mostrar mensaje de exito
        setTimeout(function () {
            setShowHire(false);
            setShowMenu(false);
      }, 1500)
        
    }

    return (
        <Container className="Contenedor">
            {espera ?  <Alert variant="secondary">Espere... </Alert> : null}
            {validado ? <Alert variant="success">Empleado creado con éxito </Alert> : null}

            <Form noValidate validated={validated} className="Formulario" >
            <Row>
                <Col>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Cargo</Form.Label>
                    <Form.Control as="select" name="cargo.id" value={cargoId} onChange={(e) => setCargoId(e.target.value)} required>
                        <option value={''}>-</option>
                        {cargos.map( cargo => (
                            <option value={cargo.id}>{cargo.nombre}</option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                  Por favor indique el cargo
                </Form.Control.Feedback>
                    </Form.Group>           
                </Col>
                <Col>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Departamento</Form.Label>
                    <Form.Control as="select" name="departamento.id" value={departamento.id} onChange={(e) => setdepartamento(e.target.value)} required >
                        <option value={''}>-</option>
                        {departamentos.map( departamento => (
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
                        <Form.Control as="select" name="metodo_de_pago" value={metodo_de_pago} onChange={(e) => setmetodo_de_pago(e.target.value)} required>
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
                    <Form.Group >
                    <Form.Label>Correo de pago</Form.Label>
                    <Form.Control type="email" name="correo_de_pago" value={correo_de_pago} onChange={(e) => setcorreo_de_pago(e.target.value)} required/>
                    <Form.Control.Feedback type="invalid">
                  Por favor indique el correo de pago
                </Form.Control.Feedback>
                    </Form.Group> 
                   
                </Col>
            </Row>

            <Row>
                <Col>
                    <Form.Group >
                    <Form.Label>Fecha de ingreso</Form.Label>
                    <Form.Control type="date" name="fecha_de_ingreso" value={fecha_de_ingreso} onChange={(e) => setfecha_de_ingreso(e.target.value)} required/>
                    <Form.Control.Feedback type="invalid">
                  Por favor indique la fecha de ingreso
                </Form.Control.Feedback>
                </Form.Group> 
                </Col>
                <Col>
                    <Form.Group >
                    <Form.Label>Correo institucional</Form.Label>
                    <Form.Control type="email" name="correo_empresarial" value={correo_empresarial} onChange={(e) => setcorreo_empresarial(e.target.value)} required/>
                    <Form.Control.Feedback type="invalid">
                  Por favor indique el correo institucional
                </Form.Control.Feedback>
                 </Form.Group>                 
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group >
                    <Form.Label>Fecha de inicio de contrato</Form.Label>
                    <Form.Control type="date" name="fecha_inicio_contrato" value={fecha_inicio_contrato} onChange={(e) => setfecha_inicio_contrato(e.target.value)} required/>
                    <Form.Control.Feedback type="invalid">
                  Por favor indique la fecha de inicio de contrato
                </Form.Control.Feedback>
                </Form.Group> 
                </Col>
                <Col>
                <Form.Group >
                    <Form.Label>Fecha fin de contrato</Form.Label>
                    <Form.Control type="date" name="fecha_fin_contrato" value={fecha_fin_contrato} onChange={(e) => setfecha_fin_contrato(e.target.value)} required/>
                    <Form.Control.Feedback type="invalid">
                  Por favor indique la fecha de fin de contrato
                </Form.Control.Feedback>
                </Form.Group>               
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group >
                    <Form.Label>Skills</Form.Label>
                    <Form.Control type="text" as="textarea" rows={2} value={skills} onChange={(e) => setSkills(e.target.value)} required/>
                    <Form.Control.Feedback type="invalid">
                  Por favor indique skills
                </Form.Control.Feedback>
                </Form.Group> 
                </Col>
                <Col>
               
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
                        <Form.File id="photo" type="file" label="Foto Empleado" id="foto" accept=".jpg, .jpeg, .png" onClick={extractFile}/>
                    </Form.Group>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col>
                    <Button 
                        variant="primary" 
                        onClick={hireProspect}>
                        Contratar
                    </Button>
                </Col>
                <Col>

                </Col>
            </Row>

            </Form>
        </Container>
    )
}

export default Hire;
