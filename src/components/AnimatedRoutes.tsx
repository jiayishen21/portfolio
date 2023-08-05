import React from "react"
import { Route, Routes, useLocation } from 'react-router-dom'
import About from './About'

import { AnimatePresence } from 'framer-motion'
import Projects from "./Projects"

interface Props {
  curProject: number
  setCurProject: React.Dispatch<React.SetStateAction<number>>
  onMenu: boolean
  setOnMenu: React.Dispatch<React.SetStateAction<boolean>>

  mouseDown: number | null
  setMouseDown: React.Dispatch<React.SetStateAction<number | null>>
  prevPercentage: number
  setPrevPercentage: React.Dispatch<React.SetStateAction<number>>
  percentage: number
  setPercentage: React.Dispatch<React.SetStateAction<number>>
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
              onMenu={props.onMenu}
              setOnMenu={props.setOnMenu}

              percentage={props.percentage}
              setPercentage={props.setPercentage}
              
              mouseDown={props.mouseDown}
              setMouseDown={props.setMouseDown}
              prevPercentage={props.prevPercentage}
              setPrevPercentage={props.setPrevPercentage}
            />}
          />
          <Route path='/about' element={<About />}/>
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default AnimatedRoutes

