import { BrowserRouter as Router } from 'react-router-dom'
import Nav from './components/Nav'
import AnimatedRoutes from './components/AnimatedRoutes';
import { useState } from 'react';

const App: React.FC = () => {
  const [curProject, setCurProject] = useState<number>(0)
  const [scrollPosition, setScrollPosition] = useState<number>(0)
  const [onMenu, setOnMenu] = useState<boolean>(false)

  return (
    <>
      <Router>
        <Nav />
        <AnimatedRoutes
          curProject={curProject}
          setCurProject={setCurProject}
          scrollPosition={scrollPosition}
          setScrollPosition={setScrollPosition}
          onMenu={onMenu}
          setOnMenu={setOnMenu}
        />
      </Router>
    </>
  )
}

export default App
