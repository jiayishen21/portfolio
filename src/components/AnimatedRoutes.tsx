import React from "react"
import { Route, Routes, useLocation } from 'react-router-dom'
import About from './About'

import { AnimatePresence } from 'framer-motion'
import Projects from "./Projects"

interface Props {
  curProject: number
  setCurProject: React.Dispatch<React.SetStateAction<number>>
  scrollPosition: number
  setScrollPosition: React.Dispatch<React.SetStateAction<number>>
  onMenu: boolean
  setOnMenu: React.Dispatch<React.SetStateAction<boolean>>
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
              setScrollPosition={props.setScrollPosition}
              onMenu={props.onMenu}
              setOnMenu={props.setOnMenu}
            />}
          />
          <Route path='/about' element={<About />}/>
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default AnimatedRoutes

