import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'

function Attribute({ value, text }) {
  return value ? (
    <ListGroup.Item>
      {text}: {value}
    </ListGroup.Item>
  ) : null
}

function Attributes({ attributes, props }) {
  const { strength, dexterity, vitality, energy } = attributes
  const noPoints = strength && !dexterity && !vitality && !energy

  if (noPoints) {
    return (
      <Card bg='danger' {...props}>
        <Card.Header>No Points Allocated</Card.Header>
      </Card>
    )
  }
  return (
    <Card bg='primary' text='white' {...props}>
      <Card.Header>Attribute Allocation</Card.Header>
      <ListGroup variant='flush'>
        <Attribute value={strength ?? 0} text='Strength' />
        <Attribute value={dexterity ?? 0} text='Dexterity' />
        <Attribute value={vitality ?? 0} text='Vitality' />
        <Attribute value={energy ?? 0} text='Energy' />
      </ListGroup>
    </Card>
  )
}

export default Attributes
