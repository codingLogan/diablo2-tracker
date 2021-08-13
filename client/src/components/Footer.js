import React from 'react'
import { Container } from 'react-bootstrap'

function Footer() {
  return (
    <footer className='py-3'>
      <Container>
        <div>Powered By React/Redux (epic middleware)</div>
        <div>
          Built by <strong>loganras</strong> @ github
        </div>
      </Container>
    </footer>
  )
}

export default Footer
