import React, { Fragment } from 'react'

import '../../styles/Style.css'
import { Container, Row} from 'react-bootstrap';

function DetailsDis(whoever) {

    const quiensea = whoever.whoever;
    var disponibilidad;

    //console.log(quiensea); 
    
    if (quiensea.tag !== 'empleado'){
        if (quiensea.disponible){
            disponibilidad = "disponible"
        }else{
            disponibilidad = "no disponible"
        }
               
    }
    

    return (
        <Container className="ContenedorDetalles ml-5 mr-10">
                <Row>
                    <p>・Status anterior: {quiensea.tag}</p> 
                </Row>
                <Row> 
                    <p>・Nombre: {quiensea.nombre}</p>
                </Row>
                <Row>
                    <p>・Apellido: {quiensea.apellido}</p>
                </Row>
                <Row>
                    <p>・Documento de Identidad: {quiensea.documento_de_identidad}</p>
                </Row>
                <Row>
                    <p>・Fecha de Nacimiento: {quiensea.fecha_de_nacimiento}</p>
                </Row>
                <Row>
                    <p>・Correo Personal: {quiensea.correo}</p>
                </Row>           
                <Row>
                    <p>・Nacionalidad:{quiensea.nacionalidad}</p>
                </Row>
                <Row>
                    <p>・País de residencia: {quiensea.pais_de_residencia} </p>    
                </Row>            
                <Row>
                    <p>・Teléfono Fijo: {quiensea.telefono}</p>               
                </Row>
                <Row>
                    <p>・Teléfono Móvil: {quiensea.celular}</p>                
                </Row>            
                <Row>
                    <p>・Ubicación: {quiensea.ubicacion}</p>      
                </Row>
                <Row>
                    <p>・Skills: {quiensea.skills}</p> 
                </Row>

                {quiensea.tag === 'empleado'
                ?   <Fragment>
                    <Row>
                        <p>・Cargo: {quiensea.cargo}</p> 
                    </Row>
                    <Row>
                        <p>・Departamento: {quiensea.departamento}</p>
                    </Row>   
                    <Row>
                        <p>・Método de pago: {quiensea.metodo_de_pago}</p>
                    </Row>
                    <Row>
                        <p>・Correo de pago: {quiensea.correo_de_pago}</p> 
                    </Row>
                    <Row>
                        <p>・Fecha de ingreso: {quiensea.fecha_de_ingreso}</p> 
                    </Row>
                    </Fragment>
                :   <Fragment>
                    <Row>
                    <p>・Origen: {quiensea.origen} </p>     
                    </Row> 
                    <Row>
                        <p>・Fecha de contacto: {quiensea.fecha_de_contacto}</p>
                    </Row>        
                    <Row>
                        <p>・Estado del reclutamiento: {quiensea.estado_contratacion}</p>
                    </Row>
                    <Row>
                        <p>・Fecha de contratacion estimada: {quiensea.fecha_contratacion_estimada}</p> 
                    </Row>
                    <Row>
                        <p>・Disponibilidad: {disponibilidad}</p> 
                    </Row>
                    </Fragment>
                }
                <Row>
                    <p>・Motivo de desincorporacion: {quiensea.motivo_desincorporacion}</p> 
                </Row>
                <Row>
                    <p>・Observaciones de desincorporacion: {quiensea.observaciones}</p> 
                </Row>
  
        
        
        </Container>
    )
}

export default DetailsDis;
