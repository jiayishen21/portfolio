import React from "react"
import { Route, Routes, useLocation } from 'react-router-dom'
import About from './About'

import { AnimatePresence } from 'framer-motion'
import Projects from "./Projects"

interface Props {
  curProject: number | undefined
  setCurProject: React.Dispatch<React.SetStateAction<number | undefined>>
  scrollPosition: number
  setScrollPosition: React.Dispatch<React.SetStateAction<number>>
}

const AnimatedRoutes: React.FC<Props> = (props: Props) => {
  const location = useLocation()

  return (
    <>
      <AnimatePresence>
        <Routes
          location={location}
          key={location.pathname}
        >
          <Route
            path='/'
            element={<Projects
              curProject={props.curProject}
              setCurProject={props.setCurProject}
              scrollPosition={props.scrollPosition}
              //setScrollPosition={props.setScrollPosition}
            />}
          />
          <Route path='/about' element={<About />}/>
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default AnimatedRoutes

