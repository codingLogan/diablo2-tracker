import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import LoadingSpinner from '../components/LoadingSpinner'
import BaseBuildForm from '../forms/BaseBuildForm'
import useClasses from '../hooks/useClasses'
import useLoggedInUser from '../hooks/useLoggedInUser'
import usePostedBuild from '../hooks/usePostedBuild'
import { getBuildsAction, postBuildAction } from '../redux/actions/buildActions'
import { getClassesAction } from '../redux/actions/classesActions'
import { POST_BUILD_CLEAR } from '../redux/constants/buildConstants'
import ContainerPage from './ContainerPage'

function CreateBuildPage({ history }) {
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [summary, setSummary] = useState('')
  const [characterClass, setClass] = useState('')

  const user = useLoggedInUser()
  const { loading: classesLoading, classes } = useClasses()
  const { build: postedBuild } = usePostedBuild()

  useEffect(() => {
    if (!user) {
      history.push('/login')
    }
    dispatch(getClassesAction())
  }, [history, dispatch, user])

  // Only set the initial class as soon as the classes are loaded
  useEffect(() => {
    if (classes) {
      setClass(classes[0]._id)
    }
  }, [classes])

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
      postBuildAction(
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

export default CreateBuildPage
