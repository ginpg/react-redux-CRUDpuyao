import React from 'react'

import '../../../styles/Style.css'
import '../discoveryStyle.css'
import { Container, Row, Col} from 'react-bootstrap'

function readDiscovery(discovery) {
    const details = discovery.discovery
    console.log(details)
    var nota=false
    if(details.nota !== ' '){
        nota = true
    }
    return(
        <Container className="DiscoveryDetalles">
            <Row>
            <Col>              
                <Row className="mt-3"> 
                    <p>・Nombre: {details.nombre}</p>
                </Row>
                <Row>
                    <p className="txt-trans">・Tipo: {details.tipo}</p>
                </Row>
                <Row>
                    <p>・Costo (USD): {details.costo}</p>
                </Row>
                <Row>
                    <p>・Categoría: {details.categoria}</p>
                </Row>
                <Row>
                    <p>・Fecha de inicio: {details.fecha_de_entrega}</p>
                </Row>
                <Row>
                    <p className="txt-trans">・Status: {details.status} </p>     
                </Row> 
                <Row>
                {nota ? (
                    <>
                    <p>・Motivo: {details.nota}</p>
                    </>
                  ) : null}
                </Row>
            </Col>
            </Row>
        
        
        </Container>
    )
}
export default readDiscovery