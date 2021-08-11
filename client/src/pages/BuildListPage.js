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
          <>
            <LinkContainer to='/build/create'>
              <Button variant='primary' className='my-3'>
                Create A Build
              </Button>
            </LinkContainer>

            <LinkContainer to='/mine'>
              <Button variant='secondary' className='m-3'>
                Show Only My Builds
              </Button>
            </LinkContainer>
          </>
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
