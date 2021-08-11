import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import useBuilds from '../hooks/useBuilds'
import ContainerPage from './ContainerPage'
import BuildCard from '../components/BuildCard'
import { getBuildsAction } from '../redux/actions/buildActions'
import useLoggedInUser from '../hooks/useLoggedInUser'

function MyBuildsPage({ history }) {
  const dispatch = useDispatch()
  const builds = useBuilds()
  const user = useLoggedInUser()
  const [myBuilds, setMyBuilds] = useState([])

  // Take the list of all builds, and filter it down to the user's
  useEffect(() => {
    if (!user) {
      history.push('/login')
    } else {
      if (!builds) {
        dispatch(getBuildsAction())
      } else {
        setMyBuilds(builds.filter((build) => build.userId === user._id))
      }
    }
  }, [history, dispatch, builds, user])
  return (
    <ContainerPage title='My Builds'>
      <>
        {user?.name && (
          <>
            <LinkContainer to='/build/create'>
              <Button variant='primary' className='my-3'>
                Create A Build
              </Button>
            </LinkContainer>

            <LinkContainer to='/'>
              <Button variant='secondary' className='m-3'>
                Show All Builds
              </Button>
            </LinkContainer>
          </>
        )}

        {myBuilds &&
          myBuilds.map((build) => (
            <BuildCard className='my-3' key={build._id} build={build} />
          ))}
      </>
    </ContainerPage>
  )
}

export default MyBuildsPage
