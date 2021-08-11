import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Route path='/login' component={LoginPage} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
