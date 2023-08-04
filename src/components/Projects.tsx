import React, { useEffect, useState } from "react";
import Project from "./Project";

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
      imgPath: '/imgs/Visual-Sorting-Algorithms.png'
    },
    {
      name: 'Visual Sorting Algorithms3',
      link: 'https://jiayishen21.github.io/sorting-algorithms/',
      imgPath: '/imgs/Visual-Sorting-Algorithms.png'
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
      setDelay(700)
      props.setCurProject(props.curProject + 1)
    }
    else if(direction === -1 && props.curProject > 0) {
      setDelayedProject(props.curProject)
      setDelay(700)
      props.setCurProject(props.curProject - 1)
    }
  }

  const [delay, setDelay] = useState<number>(0)
  const [delayedProject, setDelayedProject] = useState<number | undefined>(undefined)

  useEffect(() => {
    const resetDelay = () => {
      setDelayedProject(undefined)
      setDelay(0)
    }

    if(delay > 0) {
      const timeoutId = setTimeout(resetDelay, 700)

      return () => clearTimeout(timeoutId)
    }
  }, [delay])
  
  return (
    <>
      {projects.map((project, index) => (
        <Project
          key={project.name}
          position={
            index - props.curProject === 0 ? 0 :
            index - props.curProject < 0 ? -1 : 1
          }
          name={project.name}
          link={project.link}
          imgPath={project.imgPath}
          onMenu={props.onMenu}
          slide={slide}
          delayedProject={delayedProject === index}
        />
      ))}
    </>
  )
}

export default Projects
