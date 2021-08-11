import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Spinner } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion'
import useBuilds from '../hooks/useBuilds'
import ContainerPage from './ContainerPage'
import BuildCard from '../components/BuildCard'
import { getBuildDetailsAction } from '../redux/actions/buildActions'
import useBuildDetails from '../hooks/useBuildDetails'

function BuildDetailsPage({ match }) {
  const buildId = match.params.buildId
  const dispatch = useDispatch()
  const { build, loading, error } = useBuildDetails(buildId)
  console.log(build)

  useEffect(() => {
    if (!build || build._id !== buildId) {
      dispatch(getBuildDetailsAction(buildId))
    }
  }, [])

  return build && !loading ? (
    <ContainerPage title={build.name}>
      <BuildCard build={build} />
    </ContainerPage>
  ) : (
    <Spinner />
  )
}

export default BuildDetailsPage
