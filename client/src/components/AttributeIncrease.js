import React from 'react'
import { Alert, ListGroup } from 'react-bootstrap'

function Attribute({ value, text }) {
  return value ? (
    <ListGroup.Item>
      {text}: {value}
    </ListGroup.Item>
  ) : null
}

function Attributes({ attributes, className }) {
  const { strength, dexterity, vitality, energy } = attributes
  const noPoints = !strength && !dexterity && !vitality && !energy

  if (noPoints) {
    return <Alert variant='info'>No Attributes Allocated</Alert>
  }
  return (
    <div className={className}>
      <h5>Attribute Allocation</h5>
      <ListGroup variant='flush'>
        <Attribute value={strength ?? 0} text='Strength' />
        <Attribute value={dexterity ?? 0} text='Dexterity' />
        <Attribute value={vitality ?? 0} text='Vitality' />
        <Attribute value={energy ?? 0} text='Energy' />
      </ListGroup>
    </div>
  )
}

export default Attributes
