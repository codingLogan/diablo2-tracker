import React from 'react'
import { Row, Col } from 'react-bootstrap'

function FormContainer({ children }) {
  return (
    <Row className='justify-content-md-center'>
      <Col xs={12} md={10} lg={8}>
        {children}
      </Col>
    </Row>
  )
}

export default FormContainer
