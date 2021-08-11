import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Alert, Spinner } from 'react-bootstrap'
import ContainerPage from './ContainerPage'
import { getBuildDetailsAction } from '../redux/actions/buildActions'
import useBuildDetails from '../hooks/useBuildDetails'
import Attributes from '../components/AttributeIncrease'
import SkillAllocation from '../components/SkillAllocation'

function BuildDetailsPage({ match }) {
  const buildId = match.params.buildId
  const dispatch = useDispatch()
  const { build, loading } = useBuildDetails(buildId)

  useEffect(() => {
    if (!build || build._id !== buildId) {
      dispatch(getBuildDetailsAction(buildId))
    }
  }, [dispatch, build, buildId])

  return build && !loading ? (
    <ContainerPage title={build.name} showHomeButton>
      <h3>{build.classId.name}</h3>
      <p>{build.summary}</p>

      <div className='mt-5'>
        <h3 className='mb-4'>Progression By Level</h3>
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
