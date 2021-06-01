import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clienteAxios from '../../configuracion_axios/axios';
import '../../styles/Style.css'
import { Container, Row, Col} from 'react-bootstrap';

function DetailsProject({project, activo}) {

    //console.log(project)
    const stack = project.stack_tecnologico.tecnologias.toString()

    return (
        <Container className="ContenedorDetalles">
            <Row>
            <Col className="ml-5 justify-content-center"> 
                <Row> 
                <img src={`https://sgp-api-stg.shokworks.io/api/proyectos/image/${project.id}`} alt="foto" height="300" width="300"/>
                </Row> 
            </Col>
            <Col> 
                <Row className="mt-3"> 
                    <p>・Nombre: {project.nombre}</p>
                </Row>
                <Row>
                    <p>・Nombre del Owner: {project.nombre_owner}</p>
                </Row>
                <Row>
                    <p>・Nombre del producto: {project.nombre_producto}</p>
                </Row>
                <Row>
                    <p>・Stack tecnológico: {stack}</p>
                </Row>                    
                <Row>
                    <p>・Descripción: {project.descripcion}</p>
                </Row>
                <Row>
                    <p>・Costo: {project.costo} </p>     
                </Row>            
                <Row>
                    <p>・Tipo:{project.tipo}</p>
                </Row>
                <Row>
                    <p>・Categoría: {project.categoria} </p>    
                </Row>            
                <Row>
                    <p>・Fecha de inicio: {project.fecha_inicio}</p>               
                </Row>
                <Row>
                    <p>・Fecha estimada de culminación: {project.fecha_culminacion}</p>                
                </Row>            
                <Row>
                    <p>・Project Manager encargado: {project.manager}</p>      
                </Row>
                <Row>
                    <p>・Semanas de duración: {project.semanas_duracion}</p>
                </Row>        
                <Row>
                    <p>・Número de Sprints: {project.nro_sprints}</p>
                </Row>
                {activo
                ? null
                :<Row><p>・Nota: {project.nota}</p></Row>
                }
            </Col>        
            </Row>
            
            
            </Container>
    )
}

export default DetailsProject;
