import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import LevelForm, { defaultAttributes } from '../forms/LevelForm'
import useBuildDetails from '../hooks/useBuildDetails'
import useClasses from '../hooks/useClasses'
import useNewBuildLevel from '../hooks/useNewBuildLevel'
import { editBuildLevelAction } from '../redux/actions/buildActions'
import { NEW_BUILD_LEVEL_CLEAR } from '../redux/constants/buildConstants'
import ContainerPage from './ContainerPage'

function EditLevelPage({ match, history }) {
  // Route parameters
  const buildId = match.params.buildId
  const editLevelNumber = Number(match.params.level)

  const dispatch = useDispatch()
  const { build, loading: loadingBuild } = useBuildDetails(buildId)
  const { buildDetail } = useNewBuildLevel()
  const { classes, loading: loadingClasses } = useClasses([])

  // Form fields
  const [skills, setSkills] = useState([])
  const [skill, setSkill] = useState('')
  const [attributes, setAttributes] = useState(defaultAttributes)

  // Preload the form fields from the current level
  useEffect(() => {
    if (build && build.buildDetails.levels) {
      const buildLevel = build.buildDetails.levels.find(
        (levelObj) => levelObj.level === editLevelNumber
      )

      if (buildLevel && buildLevel?.improvements?.skills?.length) {
        // TODO make this an array, or object with selection and a number
        setSkill(buildLevel?.improvements?.skills[0].name)
        setAttributes(buildLevel?.improvements?.attributes ?? defaultAttributes)
      }
    }
  }, [build, setSkill, setAttributes, editLevelNumber])

  // Get the available skills for the character class
  // Prerequisite: the build's class selection
  useEffect(() => {
    if (classes && build && buildId === build._id) {
      const buildsClass = classes.find(
        (charClass) => charClass._id === build.classId._id
      )
      setSkills(buildsClass.skillTrees)
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
      editBuildLevelAction(build._id, editLevelNumber, {
        skills: [{ name: skill }],
        attributes,
      })
    )
  }

  return (
    <FormContainer>
      <ContainerPage title={`Edit Level ${editLevelNumber ?? ''} Entry`}>
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
          <Spinner />
        )}
      </ContainerPage>
    </FormContainer>
  )
}

export default EditLevelPage
