import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import useBuilds from '../hooks/useBuilds'
import ContainerPage from './ContainerPage'
import BuildCard from '../components/BuildCard'
import { getBuildsAction } from '../redux/actions/buildActions'
import useLoggedInUser from '../hooks/useLoggedInUser'
import { Link } from 'react-router-dom'

function BuildListPage() {
  const dispatch = useDispatch()
  const builds = useBuilds()
  const user = useLoggedInUser()

  useEffect(() => {
    if (!builds) {
      dispatch(getBuildsAction())
    }
  }, [dispatch, builds])
  return (
    <ContainerPage title='Diablo 2 Builds'>
      <>
        {user?.name && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <LinkContainer to='/build/create'>
              <Button variant='primary'>Create A Build</Button>
            </LinkContainer>

            <LinkContainer className='ms-2' to='/mine'>
              <Button variant='secondary'>Show Only My Builds</Button>
            </LinkContainer>
          </div>
        )}

        {!user?.name && (
          <p>
            <Link to='/login'>Log In</Link> to create a build of your own
          </p>
        )}

        {builds &&
          builds.map((build) => (
            <BuildCard className='my-3' key={build._id} build={build} />
          ))}
      </>
    </ContainerPage>
  )
}

export default BuildListPage
