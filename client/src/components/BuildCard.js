import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Card } from 'react-bootstrap'

function BuildCard({ build, className }) {
  const charClass = build?.classId?.name ?? 'Unknown Character Class'
  const userName = build?.userRef?.name ?? 'anonymous'

  return (
    <Card className={className}>
      <Card.Header>{charClass}</Card.Header>
      <Card.Body>
        <Card.Title>{build.name}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>
          {`created by ${userName}`}
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
