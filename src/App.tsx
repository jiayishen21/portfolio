import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Nav from './components/Nav'
import AnimatedRoutes from './components/AnimatedRoutes';

const App: React.FC = () => {

  return (
    <>
      <Router>
        <Nav />
        <AnimatedRoutes />
      </Router>
    </>
  )
}

export default App
