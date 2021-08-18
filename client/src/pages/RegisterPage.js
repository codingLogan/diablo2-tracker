import React, { useState, useEffect } from 'react'
import ContainerPage from './ContainerPage'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { registerAction } from '../redux/actions/userActions'
import FormContainer from '../components/FormContainer'
import useLoggedInUser from '../hooks/useLoggedInUser'

function RegisterPage({ history }) {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Push the user back to the home page if already logged in
  const user = useLoggedInUser()
  useEffect(() => {
    if (user && user.token) {
      history.push('/')
    }
  }, [user, history])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(registerAction(name, email, password))
  }

  return (
    <FormContainer>
      <ContainerPage
        style={{
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        title='Create an Account'
      >
        <Form onSubmit={onSubmit}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
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
            Register
          </Button>
          <Link className='mx-2' to='/register'>
            Create Account
          </Link>
        </Form>
      </ContainerPage>
    </FormContainer>
  )
}

export default RegisterPage
