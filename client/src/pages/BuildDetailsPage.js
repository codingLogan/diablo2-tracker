import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import ContainerPage from './ContainerPage'
import { getBuildDetailsAction } from '../redux/actions/buildActions'
import useBuildDetails from '../hooks/useBuildDetails'

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

      <div className='py-4'>
        <h3>Progression By Level</h3>
        {build.buildDetails.levels.map((level) => (
          <div key={level.level} className='py-3'>
            <h4>Level {level.level}</h4>
            {level.improvements.skills.length > 0 && (
              <div className='py-1'>
                <h5>Skills Increases</h5>
                <ul>
                  {level.improvements.skills.map((skill) => (
                    <li key={level.level + skill.name}>{skill.name}</li>
                  ))}
                </ul>
              </div>
            )}

            <h5>Attribute Point Increases</h5>
            <ul>
              <li>
                Strength: {level?.improvements?.attributes?.strength ?? 0}
              </li>
              <li>
                Dexterity: {level?.improvements?.attributes?.dexterity ?? 0}
              </li>
              <li>
                Vitality: {level?.improvements?.attributes?.vitality ?? 0}
              </li>
              <li>Energy: {level?.improvements?.attributes?.energy ?? 0}</li>
            </ul>
          </div>
        ))}
      </div>
    </ContainerPage>
  ) : (
    <Spinner />
  )
}

export default BuildDetailsPage
