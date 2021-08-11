import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import useBuilds from '../hooks/useBuilds'
import ContainerPage from './ContainerPage'
import BuildCard from '../components/BuildCard'
import { getBuildsAction } from '../redux/actions/buildActions'
import useLoggedInUser from '../hooks/useLoggedInUser'

function BuildListPage() {
  const dispatch = useDispatch()
  const builds = useBuilds()
  const user = useLoggedInUser()

  useEffect(() => {
    if (!builds) {
      dispatch(getBuildsAction())
    }
  }, [])
  return (
    <ContainerPage title='Diablo 2 Builds'>
      {user?.name && (
        <LinkContainer to='/build/create'>
          <Button className='my-3'>Create A Build</Button>
        </LinkContainer>
      )}
      {!user?.name && <p>Log in to create a build</p>}
      {builds && builds.map((build) => <BuildCard build={build} showLink />)}
    </ContainerPage>
  )
}

export default BuildListPage
