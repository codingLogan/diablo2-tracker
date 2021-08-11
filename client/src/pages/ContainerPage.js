import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function ContainerPage({ title, showHomeButton, children }) {
  return (
    <Container className='py-3'>
      {showHomeButton && (
        <LinkContainer to='/' className='my-3'>
          <Button variant='light' type='button'>
            Back to Builds
          </Button>
        </LinkContainer>
      )}
      <h1>{title}</h1>
      {children}
    </Container>
  )
}

export default ContainerPage
