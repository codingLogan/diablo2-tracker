import React from 'react'
import { Alert, Button, Spinner } from 'react-bootstrap'
import ContainerPage from './ContainerPage'
import useBuildDetails from '../hooks/useBuildDetails'
import Attributes from '../components/AttributeIncrease'
import SkillAllocation from '../components/SkillAllocation'
import { LinkContainer } from 'react-router-bootstrap'

function BuildDetailsPage({ match }) {
  const buildId = match.params.buildId
  const { build, loading } = useBuildDetails(buildId)

  return build && !loading ? (
    <ContainerPage title={build.name} showHomeButton>
      <h3>{build.classId.name}</h3>
      <p>{build.summary}</p>

      <div className='mt-5'>
        <h3 className='mb-4'>Progression By Level</h3>
        <LinkContainer className='mb-4' to={`/builds/${build._id}/level`}>
          <Button type='button'>Add New Level</Button>
        </LinkContainer>
        {build.buildDetails.levels.map((level) => (
          <div key={level.level} className='py-2'>
            <h4>Level {level.level}</h4>

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
        ))}
      </div>
    </ContainerPage>
  ) : (
    <Spinner />
  )
}

export default BuildDetailsPage
