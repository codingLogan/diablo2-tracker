import React from 'react'
import { Container } from 'react-bootstrap'

function ContainerPage({ title, children }) {
  return (
    <Container className='py-3'>
      <h1>{title}</h1>
      {children}
    </Container>
  )
}

export default ContainerPage
