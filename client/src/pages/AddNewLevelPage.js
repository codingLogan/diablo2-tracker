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
  const [attributes, setAttributes] = useState({
    strength: 0,
    dexterity: 0,
    vitality: 0,
    energy: 0,
  })

  // Selectable skill fields
  const [selectedSkills, setSelectedSkills] = useState([{ name: '' }])

  useEffect(() => {
    if (classes && build && buildId === build._id) {
      const buildsClass = classes.find(
        (charClass) => charClass._id === build.classId._id
      )
      setSkills(buildsClass.skillTrees)
      setSelectedSkills([buildsClass.skillTrees[0].skills[0]])
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
        skills: selectedSkills,
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
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
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
