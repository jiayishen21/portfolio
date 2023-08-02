import React from "react"
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Project from "./Project"
import About from './About'

import { AnimatePresence } from 'framer-motion'

const AnimatedRoutes: React.FC = () => {
  const location = useLocation()

  const projects = [
    {
      name: 'Visual Sorting Algorithms',
      link: 'https://jiayishen21.github.io/sorting-algorithms/',
    }
  ]

  return (
    <>
      <AnimatePresence>
        <Routes
          location={location}
          key={location.pathname}
        >
          {projects.map((project) => (
            <Route
              path='/'
              key={project.name}
              element={<Project name={project.name} link={project.link} />}
            />
          ))}
          <Route path='/about' element={<About />}/>
        </Routes>
      </AnimatePresence>
    </>
  )
}

export default AnimatedRoutes

