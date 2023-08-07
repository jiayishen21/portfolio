import { BrowserRouter as Router } from 'react-router-dom'
import Nav from './components/Nav'
import AnimatedRoutes from './components/AnimatedRoutes';
import { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [curProject, setCurProject] = useState<number>(0)
  const [onMenu, setOnMenu] = useState<boolean>(false)

  const [mouseDown, setMouseDown] = useState<number | null>(null)
  const [prevPercentage, setPrevPercentage] = useState<number>(0)
  const [percentage, setPercentage] = useState<number>(0)

  const [switchPage, setSwitchPage] = useState<number>(0)
  const [page, setPage] = useState<string>('/')

  useEffect(() => {
    const resetDelay = () => {
      setSwitchPage(0)
    }

    if(switchPage > 0) {
      const timeoutId = setTimeout(resetDelay, switchPage)

      return () => clearTimeout(timeoutId)
    }
  }, [switchPage])


  return (
    <>
      <div
       className={switchPage > 0 ? 'no-scroll' : ''}
      >
      <Router>
        <Nav
          switchPage={switchPage}
          setSwitchPage={setSwitchPage}

          page={page}
          setPage={setPage}
        />
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

          switchPage={switchPage}
          setSwitchPage={setSwitchPage}

          page={page}
        />
      </Router>
      </div>
    </>
  )
}

export default App
