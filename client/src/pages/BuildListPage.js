import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useBuilds from '../hooks/useBuilds'
import ContainerPage from './ContainerPage'
import BuildCard from '../components/BuildCard'
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
      {builds && builds.map((build) => <BuildCard build={build} showLink />)}
    </ContainerPage>
  )
}

export default BuildListPage
