import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const DashboardPage = () => (
  <>
    <Container>
      <Row>
        <Col xs={6} md={6} lg={6}>
          <img src="./exampleGraphs/Expenses.webp" className="img-fluid" alt="expenses graph" />
        </Col>
        <Col xs={6} md={6} lg={6}>
          <img src="./exampleGraphs/Revenue.png" className="img-fluid" alt="Revenue graph" />
        </Col>
      </Row>

      <Row>
        <Col xs={6} md={6} lg={6}>
          <img src="./exampleGraphs/Highlights.png" className="img-fluid" alt="Revenue graph" />
        </Col>
        <Col xs={6} md={6} lg={6}>
          <img src="./exampleGraphs/Performance.jpg" className="img-fluid" alt="Revenue graph" />
        </Col>
      </Row>
    </Container>
  </>
)

export default DashboardPage
