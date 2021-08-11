import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Card } from 'react-bootstrap'

function BuildCard({ build, className }) {
  return (
    <Card className={className}>
      <Card.Header>{build.name}</Card.Header>
      <Card.Body>
        <Card.Subtitle className='mb-2 text-muted'>
          {build?.classId?.name ?? 'Class Name'}
        </Card.Subtitle>
        <Card.Text>{build.summary}</Card.Text>
        <LinkContainer to={`/builds/${build._id}`}>
          <Card.Link>View Details</Card.Link>
        </LinkContainer>
      </Card.Body>
    </Card>
  )
}

export default BuildCard
