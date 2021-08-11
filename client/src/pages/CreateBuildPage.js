import React, { useEffect, useState } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import FormContainer from '../components/FormContainer'
import useClasses from '../hooks/useClasses'
import useLoggedInUser from '../hooks/useLoggedInUser'
import { postBuildAction } from '../redux/actions/buildActions'
import { getClassesAction } from '../redux/actions/classesActions'
import ContainerPage from './ContainerPage'

function CreateBuildPage({ history }) {
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [summary, setSummary] = useState('')
  const [characterClass, setClass] = useState('')

  const user = useLoggedInUser()
  const { loading: classesLoading, classes } = useClasses()

  useEffect(() => {
    if (!user) {
      history.push('/login')
    }
    dispatch(getClassesAction())
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(
      postBuildAction(
        {
          userId: user._id,
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
        <Form onSubmit={onSubmit}>
          <Form.Group controlId='name'>
            <Form.Label>Build Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter the build name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='summary'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter a descriptive summary'
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </Form.Group>

          {classesLoading && <Spinner />}
          {classes && (
            <div className='my-3'>
              <select
                style={{ width: '100%' }}
                onChange={(e) => setClass(e.target.value)}
              >
                {classes.map((charClass) => (
                  <option key={charClass._id} value={charClass._id}>
                    {charClass.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Button type='submit' className='my-3'>
            Create Build
          </Button>
        </Form>
      </ContainerPage>
    </FormContainer>
  )
}

export default CreateBuildPage
