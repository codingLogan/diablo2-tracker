import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import useBuildDetails from '../hooks/useBuildDetails'
import useClasses from '../hooks/useClasses'
import useNewBuildLevel from '../hooks/useNewBuildLevel'
import { newBuildLevelAction } from '../redux/actions/buildActions'
import { NEW_BUILD_LEVEL_CLEAR } from '../redux/constants/buildConstants'
import ContainerPage from './ContainerPage'

function AddNewLevelPage({ match, history }) {
  const buildId = match.params.buildId
  const dispatch = useDispatch()
  const { build } = useBuildDetails(buildId)
  const { buildDetail } = useNewBuildLevel()

  const { classes } = useClasses()
  const [skills, setSkills] = useState([])
  const [skill, setSkill] = useState('')
  const [attributes, setAttributes] = useState({
    strength: 0,
    dexterity: 0,
    vitality: 0,
    energy: 0,
  })

  console.log('Component State Review', {
    skill,
    attributes,
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
      <ContainerPage title='New Level Entry'>
        <Form className='mt-4' onSubmit={onSubmit}>
          <label htmlFor='skillselect'>Select a Skill</label>
          <select
            style={{ width: '100%' }}
            onChange={(e) => setSkill(e.target.value)}
            value={skill}
            id='skillselect'
          >
            {skills.map((skillTree) => (
              <optgroup key={skillTree.name} label={skillTree.name}>
                {skillTree.skills.map((skill) => (
                  <option key={skill.name} value={skill.name}>
                    {skill.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>

          <Form.Group className='py-2' controlId='strength'>
            <Form.Label>Strength</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter strenth points'
              value={attributes.strength}
              onChange={(e) =>
                setAttributes({
                  ...attributes,
                  strength: Number(e.target.value),
                })
              }
            />
          </Form.Group>

          <Form.Group className='py-2' controlId='dexterity'>
            <Form.Label>Dexterity</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter dexterity points'
              value={attributes.dexterity}
              onChange={(e) =>
                setAttributes({
                  ...attributes,
                  dexterity: Number(e.target.value),
                })
              }
            />
          </Form.Group>

          <Form.Group className='py-2' controlId='vitality'>
            <Form.Label>Vitality</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter vitality points'
              value={attributes.vitality}
              onChange={(e) =>
                setAttributes({
                  ...attributes,
                  vitality: Number(e.target.value),
                })
              }
            />
          </Form.Group>

          <Form.Group className='py-2' controlId='energy'>
            <Form.Label>Energy</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter energy points'
              value={attributes.energy}
              onChange={(e) =>
                setAttributes({ ...attributes, energy: Number(e.target.value) })
              }
            />
          </Form.Group>

          <Button className='mt-3' type='submit'>
            Submit
          </Button>
        </Form>
      </ContainerPage>
    </FormContainer>
  )
}

export default AddNewLevelPage
