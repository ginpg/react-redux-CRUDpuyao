// Global imports
import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import JWT from 'jsonwebtoken'
import { Form, message } from 'antd'
import Logo from '../../assets/images/Login/Logo_Shokworks.png'

// import { useHistory } from "react-router-dom";
// Local imports
import './loginLayout.scss'

function LoginLayout(props) {
  return (
    <Container fluid={true} className="container-fluid-custom mx-0">
      <Row className="justify-content-center align-items-center row-center-custom">
        <Col md="4">
          <Form name="normal_login" className="login-form px-5" ref={props.formRef} onFinish={props.onFinish} onFieldsChange={props.onFieldsChange}>
            <Form.Item className="mt-4 text-center">
              <img src={Logo} alt="Shokworks Logo" className="Logo"/>
            </Form.Item>
            {props.children}
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginLayout
