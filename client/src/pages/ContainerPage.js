import React from 'react'
import { Container, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function ContainerPage({ title, showHomeButton, children }) {
  return (
    <Container className='py-3'>
      <Row className='justify-content-md-center'>
        {/* Used to keep content in the middle and leave space on the sides */}
        <Col xs={12} sm={12} md={10} lg={8}>
          {showHomeButton && (
            <LinkContainer to='/' className='my-3'>
              <Button variant='light' type='button'>
                Back to Builds
              </Button>
            </LinkContainer>
          )}
          <h1>{title}</h1>
          {children}
        </Col>
      </Row>
    </Container>
  )
}

export default ContainerPage
