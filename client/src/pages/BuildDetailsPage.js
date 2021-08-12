import React from 'react'
import { Alert, Button, Card, Spinner } from 'react-bootstrap'
import ContainerPage from './ContainerPage'
import useBuildDetails from '../hooks/useBuildDetails'
import Attributes from '../components/AttributeIncrease'
import SkillAllocation from '../components/SkillAllocation'
import { LinkContainer } from 'react-router-bootstrap'
import useLoggedInUser from '../hooks/useLoggedInUser'

function BuildDetailsPage({ match }) {
  const buildId = match.params.buildId
  const { build, loading } = useBuildDetails(buildId)
  const user = useLoggedInUser()
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

      <div className='mt-5'>
        <h3 className='mb-4'>Progression By Level</h3>

        {ownerIsViewing && (
          <LinkContainer className='mb-4' to={`/builds/${build._id}/level`}>
            <Button type='button'>Add New Level</Button>
          </LinkContainer>
        )}
        {build.buildDetails.levels.map((level) => (
          <Card className='my-2'>
            <Card.Header>Level {level.level}</Card.Header>
            <Card.Body>
              <div key={level.level} className='py-2'>
                {level?.improvements?.skills?.length > 0 ? (
                  <SkillAllocation
                    className='my-3'
                    skills={level.improvements.skills}
                  />
                ) : (
                  <Alert variant='dark'>No Skills Allocated</Alert>
                )}

                {level?.improvements?.attributes ? (
                  <Attributes
                    className='my-3'
                    attributes={level.improvements.attributes}
                  />
                ) : (
                  <Alert variant='dark'>No Attributes Allocated</Alert>
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
