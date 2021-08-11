import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Card } from 'react-bootstrap'

function BuildCard({ build, showLink = false }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{build.name}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>
          {build?.classId?.name ?? 'Class Name'}
        </Card.Subtitle>
        <Card.Text>{build.summary}</Card.Text>
        {showLink && (
          <LinkContainer to={`/builds/${build._id}`}>
            <Card.Link>View Details</Card.Link>
          </LinkContainer>
        )}
      </Card.Body>
    </Card>
  )
}

export default BuildCard
