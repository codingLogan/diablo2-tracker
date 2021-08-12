import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'

function SkillAllocation({ skills, ...props }) {
  return (
    <>
      <h5>Skill Allocation</h5>
      <ListGroup variant='flush'>
        {skills.map((skill) => (
          <ListGroup.Item key={skill._id}>{skill.name}</ListGroup.Item>
        ))}
      </ListGroup>
    </>
  )
}

export default SkillAllocation
