import React, { useState, useEffect } from 'react'
import ContainerPage from './ContainerPage'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { loginAction } from '../redux/actions/userActions'
import FormContainer from '../components/FormContainer'
import useLoggedInUser from '../hooks/useLoggedInUser'

function LoginPage({ history }) {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const user = useLoggedInUser()

  useEffect(() => {
    if (user && user.token) {
      history.push('/')
    }
  }, [user, history])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(loginAction(email, password))
  }

  return (
    <FormContainer>
      <ContainerPage title='Please Log In'>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter a password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button type='submit' className='my-3'>
            Log In
          </Button>
        </Form>
      </ContainerPage>
    </FormContainer>
  )
}

export default LoginPage
