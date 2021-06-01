import React from 'react'

import '../../styles/Style.css'
import { Container, Row} from 'react-bootstrap';

function DetailsProspect(prospect) {

    const prospecto = prospect.prospect;
    var disponibilidad;
    if (prospecto.disponible){
        disponibilidad = "disponible"
    }else{
        disponibilidad = "no disponible"
    }
    //console.log(prospecto);


    return (
        <Container className="ContenedorDetalles ml-5 mr-10">
                <Row> 
                    <p>・Nombre: {prospecto.nombre}</p>
                </Row>
                <Row>
                    <p>・Apellido: {prospecto.apellido}</p>
                </Row>
                <Row>
                    <p>・Documento de Identidad: {prospecto.documento_de_identidad}</p>
                </Row>
                <Row>
                    <p>・Fecha de Nacimiento: {prospecto.fecha_de_nacimiento}</p>
                </Row>
                <Row>
                    <p>・Correo Personal: {prospecto.correo}</p>
                </Row>
                <Row>
                    <p>・Origen: {prospecto.origen} </p>     
                </Row>            
                <Row>
                    <p>・Nacionalidad:{prospecto.nacionalidad}</p>
                </Row>
                <Row>
                    <p>・País de residencia: {prospecto.pais_de_residencia} </p>    
                </Row>            
                <Row>
                    <p>・Teléfono Fijo: {prospecto.telefono}</p>               
                </Row>
                <Row>
                    <p>・Teléfono Móvil: {prospecto.celular}</p>                
                </Row>            
                <Row>
                    <p>・Ubicación: {prospecto.ubicacion}</p>      
                </Row>
                <Row>
                    <p>・Fecha de contacto: {prospecto.fecha_de_contacto}</p>
                </Row>        
                <Row>
                    <p>・Estado del reclutamiento: {prospecto.estado_contratacion}</p>
                </Row>
                <Row>
                    <p>・Fecha de contratacion estimada: {prospecto.fecha_contratacion_estimada}</p> 
                </Row>
                <Row>
                    <p>・Disponibilidad: {disponibilidad}</p> 
                </Row>
                <Row>
                    <p>・Cargo: {prospecto.cargo}</p> 
                </Row>
                <Row>
                    <p>・Skills: {prospecto.skills}</p> 
                </Row>

        
        
        </Container>
    )
}

export default DetailsProspect;
