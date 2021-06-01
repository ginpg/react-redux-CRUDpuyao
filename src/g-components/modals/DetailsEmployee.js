import React from 'react'

import '../../styles/Style.css'
import { Container, Row, Col} from 'react-bootstrap';

function DetailsEmployee(employee) {

    const empleado = employee.employee;
    return (
        <Container className="ContenedorDetalles">
            <Row>
            <Col className="ml-5 justify-content-center"> 
                <Row> 
                <img src={`https://sgp-api-stg.shokworks.io/api/empleado/image/${empleado.id}`} alt="img" height="300" width="300" />
                </Row> 
            </Col>
            <Col>              
                <Row className="mt-3"> 
                    <p>・Nombre: {empleado.nombre}</p>
                </Row>
                <Row>
                    <p>・Apellido: {empleado.apellido}</p>
                </Row>
                <Row>
                    <p>・Documento de Identidad: {empleado.documento_de_identidad}</p>
                </Row>
                <Row>
                    <p>・Fecha de Nacimiento: {empleado.fecha_de_nacimiento}</p>
                </Row>
                <Row>
                    <p>・Correo Personal: {empleado.correo}</p>
                </Row>
                <Row>
                    <p>・Correo Empresarial: {empleado.correo_empresarial} </p>     
                </Row>            
                <Row>
                    <p>・Nacionalidad:{empleado.nacionalidad}</p>
                </Row>
                <Row>
                    <p>・País de residencia: {empleado.pais_de_residencia} </p>    
                </Row>            
                <Row>
                    <p>・Teléfono Fijo: {empleado.telefono}</p>               
                </Row>
                <Row>
                    <p>・Teléfono Móvil: {empleado.celular}</p>                
                </Row>            
                <Row>
                    <p>・Ubicación: {empleado.ubicacion}</p>      
                </Row>
                <Row>
                    <p>・Departamento: {empleado.departamento}</p>
                </Row>        
                <Row>
                    <p>・Método de pago: {empleado.metodo_de_pago}</p>
                </Row>
                <Row>
                    <p>・Correo de pago: {empleado.correo_de_pago}</p> 
                </Row>
                <Row>
                    <p>・Fecha de ingreso: {empleado.fecha_de_ingreso}</p> 
                </Row>
                <Row>
                    <p>・Cargo: {empleado.cargo}</p> 
                </Row>
                <Row>
                    <p>・Skills: {empleado.skills}</p> 
                </Row>
            </Col>
            </Row>
        
        
        </Container>
    )
}

export default DetailsEmployee;
