import { BrowserRouter as Router } from 'react-router-dom'
import Nav from './components/Nav'
import AnimatedRoutes from './components/AnimatedRoutes';
import { useState } from 'react';

const App: React.FC = () => {
  const [curProject, setCurProject] = useState<number | undefined>(0)
  const [scrollPosition, setScrollPosition] = useState<number>(0)

  return (
    <>
      <Router>
        <Nav />
        <AnimatedRoutes
          curProject={curProject}
          setCurProject={setCurProject}
          scrollPosition={scrollPosition}
          setScrollPosition={setScrollPosition}
        />
      </Router>
    </>
  )
}

export default App
