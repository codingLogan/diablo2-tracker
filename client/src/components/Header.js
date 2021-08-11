import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { useDispatch } from 'react-redux'
import useLoggedInUser from '../hooks/useLoggedInUser'
import { logoutAction } from '../redux/actions/userActions'

function Header() {
  const dispatch = useDispatch()
  const user = useLoggedInUser()

  return (
    <header>
      <Navbar collapseOnSelect expand='lg' bg='primary' variant='dark'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Diablo 2 Build Tracker</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link
                href='https://github.com/Loganras/diablo2-tracker'
                target='_blank'
              >
                Planned Features
              </Nav.Link>
            </Nav>
            <Nav>
              {user && user.name && (
                <Navbar.Text>
                  <em>Hello {user && user.name && <span>{user.name}</span>}</em>
                </Navbar.Text>
              )}

              {user && user.name ? (
                <Nav.Link onClick={() => dispatch(logoutAction())}>
                  Log Out
                </Nav.Link>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>Log In</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
