import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'

function SkillAllocation({ skills, ...props }) {
  return (
    <Card bg='border-primary' {...props}>
      <Card.Header>Skill Allocation</Card.Header>
      <ListGroup variant='flush'>
        {skills.map((skill) => (
          <ListGroup.Item key={skill._id}>{skill.name}</ListGroup.Item>
        ))}
      </ListGroup>
    </Card>
  )
}

export default SkillAllocation
