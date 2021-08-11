import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Card } from 'react-bootstrap'
import useBuilds from '../hooks/useBuilds'
import ContainerPage from './ContainerPage'
import { getBuildsAction } from '../redux/actions/buildActions'

function BuildListPage() {
  const dispatch = useDispatch()
  const builds = useBuilds()

  useEffect(() => {
    if (!builds) {
      dispatch(getBuildsAction())
    }
  }, [])
  return (
    <ContainerPage title='Diablo 2 Builds'>
      {builds &&
        builds.map((build) => (
          <Card key={build._id}>
            <Card.Body>
              <Card.Title>{build.name}</Card.Title>
              <Card.Subtitle className='mb-2 text-muted'>
                {build?.classId?.name ?? 'Class Name'}
              </Card.Subtitle>
              <Card.Text>{build.summary}</Card.Text>
              <LinkContainer to={`/build/${build._id}`}>
                <Card.Link>View Details</Card.Link>
              </LinkContainer>
            </Card.Body>
          </Card>
        ))}
    </ContainerPage>
  )
}

export default BuildListPage
