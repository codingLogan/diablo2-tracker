import React from 'react'
import { Alert, Button, Card, Col, Row, Spinner } from 'react-bootstrap'
import ContainerPage from './ContainerPage'
import useBuildDetails from '../hooks/useBuildDetails'
import Attributes from '../components/AttributeIncrease'
import SkillAllocation from '../components/SkillAllocation'
import { LinkContainer } from 'react-router-bootstrap'
import useLoggedInUser from '../hooks/useLoggedInUser'
import { Link } from 'react-router-dom'
import useBuildSummary from '../hooks/useBuildSummary'

function BuildDetailsPage({ match }) {
  const buildId = match.params.buildId
  const { build, loading } = useBuildDetails(buildId)
  const user = useLoggedInUser()
  const { buildSummary, loading: loadingSummary } = useBuildSummary(buildId)
  let ownerIsViewing = build?.userRef?._id === user?._id

  return build && !loading ? (
    <ContainerPage title={build.name} showHomeButton>
      <h3>{build.classId.name}</h3>
      <h4>
        {`Created by ${build?.userRef?.name ?? 'anonymous'}`}{' '}
        {ownerIsViewing && "(That's you!)"}
      </h4>
      <hr />

      <h4 className='mt-5'>Description</h4>
      <p>{build.summary}</p>

      <h4 className='mt-5'>Build Summary</h4>
      {loadingSummary ? (
        <Spinner variant='primary' animation='grow' />
      ) : (
        <Card bg='primary'>
          <Card.Header>
            Character is at Level {buildSummary.currentLevel}
          </Card.Header>
          <Card.Body>
            <div>
              <h5>Skill Allocation</h5>
              {Object.getOwnPropertyNames(buildSummary.skillsTotals).length >
              0 ? (
                Object.getOwnPropertyNames(buildSummary.skillsTotals).map(
                  (property) => (
                    <div>{`${property}: ${buildSummary.skillsTotals[property]}`}</div>
                  )
                )
              ) : (
                <Alert variant='info'>No Skills Allocated</Alert>
              )}

              {buildSummary.attributesTotals ? (
                <Attributes
                  className='my-3'
                  attributes={buildSummary.attributesTotals}
                />
              ) : (
                <Alert variant='info'>No Attributes Allocated</Alert>
              )}
            </div>
          </Card.Body>
        </Card>
      )}

      <div className='mt-5'>
        <h3 className='mb-4'>Progression By Level</h3>

        {ownerIsViewing && (
          <LinkContainer className='mb-4' to={`/builds/${build._id}/level`}>
            <Button type='button'>Add New Level</Button>
          </LinkContainer>
        )}
        {build.buildDetails.levels.map((level) => (
          <Card key={level.level} bg='dark' className='my-2'>
            <Card.Header>
              <Row className='justify-content-between'>
                <Col className='text-start'>Level {level.level} </Col>

                {ownerIsViewing && (
                  <Col className='text-end'>
                    <Link to={`/builds/${build._id}/level/${level.level}`}>
                      Edit
                    </Link>
                  </Col>
                )}
              </Row>
            </Card.Header>
            <Card.Body>
              <div className='py-2'>
                {level?.improvements?.skills?.length > 0 ? (
                  <SkillAllocation
                    className='my-3'
                    skills={level.improvements.skills}
                  />
                ) : (
                  <Alert variant='info'>No Skills Allocated</Alert>
                )}

                {level?.improvements?.attributes ? (
                  <Attributes
                    className='my-3'
                    attributes={level.improvements.attributes}
                  />
                ) : (
                  <Alert variant='info'>No Attributes Allocated</Alert>
                )}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </ContainerPage>
  ) : (
    <Spinner />
  )
}

export default BuildDetailsPage
