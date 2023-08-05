import React, { useEffect, useState } from "react";
import Project from "./Project";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Props {
  curProject: number
  setCurProject: React.Dispatch<React.SetStateAction<number>>
  scrollPosition: number
  setScrollPosition: React.Dispatch<React.SetStateAction<number>>
  onMenu: boolean
  setOnMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const Projects: React.FC<Props> = (props) => {
  const projects = [
    {
      name: 'Visual Sorting Algorithms',
      link: 'https://jiayishen21.github.io/sorting-algorithms/',
      imgPath: '/imgs/Visual-Sorting-Algorithms.png'
    },
    {
      name: 'Visual Sorting Algorithms2',
      link: 'https://jiayishen21.github.io/sorting-algorithms/',
      imgPath: '/imgs/camera.jpeg'
    },
  ]

  const handleScroll = (e: any) => {
    if(props.onMenu) {
      if(e.deltaY > 0) {
        props.setScrollPosition(props.scrollPosition + 1)
      }
      else {
        props.setScrollPosition(props.scrollPosition - 1)
      }
    }
    else {
      props.setOnMenu(true)
    }
  }

  useEffect(() => {
    window.addEventListener('mousewheel', handleScroll)
    return () => {
      window.removeEventListener('mousewheel', handleScroll)
    }
  }, [])

  const slide = (direction: number) => {
    if(delay > 0) {
      return
    }
    if(direction === 1 && props.curProject < projects.length - 1) {
      setDelayedProject(props.curProject)
      setDelayedTitle(props.curProject)
      setDelay(700)
      setTitleDelay(300)
      props.setCurProject(props.curProject + 1)
    }
    else if(direction === -1 && props.curProject > 0) {
      setDelayedProject(props.curProject)
      setDelayedTitle(props.curProject)
      setDelay(700)
      setTitleDelay(300)
      props.setCurProject(props.curProject - 1)
    }
  }

  const [delay, setDelay] = useState<number>(0)
  const [delayedProject, setDelayedProject] = useState<number | undefined>(undefined)
  const [titleDelay, setTitleDelay] = useState<number>(0)
  const [delayedTitle, setDelayedTitle] = useState<number | undefined>(undefined)

  useEffect(() => {
    const resetDelay = () => {
      setDelayedProject(undefined)
      setDelay(0)
    }

    if(delay > 0) {
      const timeoutId = setTimeout(resetDelay, delay)

      return () => clearTimeout(timeoutId)
    }
  }, [delay])

  useEffect(() => {
    const resetDelay = () => {
      setDelayedTitle(undefined)
      setTitleDelay(0)
    }

    if(titleDelay > 0) {
      const timeoutId = setTimeout(resetDelay, titleDelay)

      return () => clearTimeout(timeoutId)
    }
  }, [titleDelay])
  
  return (
    <>
      {projects.map((project, index) => (
        <Project
          key={project.name}
          position={
            index - props.curProject === 0 ? 0 :
            index - props.curProject < 0 ? -1 : 1
          }
          imgPath={project.imgPath}
          slide={slide}
          delayedProject={delayedProject === index}

          onMenu={props.onMenu}
        />
      ))}
      <div className="full-screen">
        <div
          className="left-half"
          onClick={() => slide(-1)}
        />
        <div
          className="right-half" 
          onClick={() => slide(1)}
        />
        <Link
          to={projects[props.curProject].link}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-animation-container">
            <motion.h1
              className={delayedTitle !== undefined ? 'up400' : 'slideUp'}
              exit={{
                y: '-400%',
                transition: {
                  duration: 0.25, ease: 'easeInOut'
                }
              }}
            >
              {delayedTitle !== undefined ? projects[delayedTitle].name : projects[props.curProject].name}
            </motion.h1>
          </div>
        </Link>

      </div>
    </>
  )
}

export default Projects
