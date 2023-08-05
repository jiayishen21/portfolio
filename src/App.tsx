import { BrowserRouter as Router } from 'react-router-dom'
import Nav from './components/Nav'
import AnimatedRoutes from './components/AnimatedRoutes';
import { useState } from 'react';

const App: React.FC = () => {
  const [curProject, setCurProject] = useState<number>(0)
  const [onMenu, setOnMenu] = useState<boolean>(false)

  const [mouseDown, setMouseDown] = useState<number | null>(null)
  const [prevPercentage, setPrevPercentage] = useState<number>(0)
  const [percentage, setPercentage] = useState<number>(0)

  return (
    <>
      <Router>
        <Nav />
        <AnimatedRoutes
          curProject={curProject}
          setCurProject={setCurProject}
          onMenu={onMenu}
          setOnMenu={setOnMenu}

          mouseDown={mouseDown}
          setMouseDown={setMouseDown}
          prevPercentage={prevPercentage}
          setPrevPercentage={setPrevPercentage}
          percentage={percentage}
          setPercentage={setPercentage}
        />
      </Router>
    </>
  )
}

export default App
