import React from 'react'
import { Spinner } from 'react-bootstrap'

function LoadingSpinner({ variant = 'primary', animation = 'grow' }) {
  return <Spinner variant={variant} animation={animation} />
}

export default LoadingSpinner
