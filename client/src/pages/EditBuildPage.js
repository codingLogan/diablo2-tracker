import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import LoadingSpinner from '../components/LoadingSpinner'
import BaseBuildForm from '../forms/BaseBuildForm'
import useBuilds from '../hooks/useBuilds'
import useClasses from '../hooks/useClasses'
import useLoggedInUser from '../hooks/useLoggedInUser'
import usePostedBuild from '../hooks/usePostedBuild'
import { editBuildAction, getBuildsAction } from '../redux/actions/buildActions'
import { getClassesAction } from '../redux/actions/classesActions'
import { POST_BUILD_CLEAR } from '../redux/constants/buildConstants'
import ContainerPage from './ContainerPage'

function EditBuildPage({ history, match }) {
  // Route parameters
  const buildId = match.params.buildId

  // Form Data
  const [name, setName] = useState('')
  const [summary, setSummary] = useState('')
  const [characterClass, setClass] = useState('')

  // Application Data
  const dispatch = useDispatch()
  const user = useLoggedInUser()
  const { loading: classesLoading, classes } = useClasses()
  //   const { builds, loading } = useBuilds()
  const builds = useBuilds()
  const { build: postedBuild } = usePostedBuild()

  useEffect(() => {
    if (!user) {
      history.push('/login')
    }
    dispatch(getClassesAction())
  }, [history, dispatch, user])

  // Load the build data into the form
  useEffect(() => {
    if (builds) {
      const build = builds.find((appBuild) => appBuild._id === buildId)

      console.log('EDIT BUILD', { build, builds })
      if (build) {
        setName(build.name)
        setSummary(build.summary)
        setClass(build.classId._id)
      }
    }
  }, [builds, setName, setSummary, setClass, buildId])

  // Let the app requery the list of builds when a new one is created
  useEffect(() => {
    if (postedBuild && postedBuild._id) {
      dispatch(getBuildsAction())
      dispatch({ type: POST_BUILD_CLEAR })
      history.push(`/builds/${postedBuild._id}`)
    }
  }, [dispatch, history, postedBuild])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(
      editBuildAction(
        buildId,
        {
          userRef: user._id,
          classId: characterClass,
          name,
          summary,
        },
        user.token
      )
    )
  }
  return (
    <FormContainer>
      <ContainerPage title='Create your build' showHomeButton>
        {!classesLoading && classes ? (
          <BaseBuildForm
            onSubmit={onSubmit}
            classes={classes}
            name={name}
            setName={setName}
            summary={summary}
            setSummary={setSummary}
            characterClass={characterClass}
            setClass={setClass}
          />
        ) : (
          <LoadingSpinner />
        )}
      </ContainerPage>
    </FormContainer>
  )
}

export default EditBuildPage
