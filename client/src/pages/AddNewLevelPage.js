import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import HeaderBlock from '../components/HeaderBlock'
import LoadingSpinner from '../components/LoadingSpinner'
import LevelForm from '../forms/LevelForm'
import useBuildDetails from '../hooks/useBuildDetails'
import useClasses from '../hooks/useClasses'
import useNewBuildLevel from '../hooks/useNewBuildLevel'
import { newBuildLevelAction } from '../redux/actions/buildActions'
import { NEW_BUILD_LEVEL_CLEAR } from '../redux/constants/buildConstants'
import ContainerPage from './ContainerPage'

function AddNewLevelPage({ match, history }) {
  const buildId = match.params.buildId
  const dispatch = useDispatch()
  const { build, loading: loadingBuild } = useBuildDetails(buildId)
  const { buildDetail } = useNewBuildLevel()
  const { currentLevel } = useSelector((state) => state.currentLevel)

  const { classes, loading: loadingClasses } = useClasses([])
  const [skills, setSkills] = useState([])
  const [skill, setSkill] = useState('')
  const [attributes, setAttributes] = useState({
    strength: 0,
    dexterity: 0,
    vitality: 0,
    energy: 0,
  })

  useEffect(() => {
    if (classes && build && buildId === build._id) {
      const buildsClass = classes.find(
        (charClass) => charClass._id === build.classId._id
      )
      setSkills(buildsClass.skillTrees)
      setSkill(buildsClass.skillTrees[0].skills[0].name)
    }
  }, [classes, build, buildId])

  // Handle what to do after a successful save
  useEffect(() => {
    if (buildDetail && buildDetail._id) {
      dispatch({ type: NEW_BUILD_LEVEL_CLEAR })
      history.push(`/builds/${buildDetail.buildId}`)
    }
  }, [dispatch, history, buildDetail])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(
      newBuildLevelAction(build._id, {
        skills: [{ name: skill }],
        attributes,
      })
    )
  }

  return (
    <FormContainer>
      <ContainerPage title='Create New Level'>
        <HeaderBlock
          header={build?.name ?? ''}
          subHeader={build?.classId?.name ?? ''}
        />
        <div>{currentLevel ? `Level ${currentLevel + 1}` : 'Next Level'}</div>

        {!loadingClasses && !loadingBuild && skills ? (
          <LevelForm
            buildId={buildId}
            onSubmit={onSubmit}
            skills={skills}
            skill={skill}
            setSkill={setSkill}
            attributes={attributes}
            setAttributes={setAttributes}
          />
        ) : (
          <LoadingSpinner />
        )}
      </ContainerPage>
    </FormContainer>
  )
}

export default AddNewLevelPage
