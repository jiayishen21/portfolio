import React, { useEffect } from "react";
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
    if(direction === 1 && props.curProject < projects.length - 1) {
      props.setCurProject(props.curProject + 1)
    }
    else if(direction === -1 && props.curProject > 0) {
      props.setCurProject(props.curProject - 1)
    }
  }
  
  return (
    <>
      {projects.map((project, index) => (
        <Project
          key={project.name}
          position={index - props.curProject}
          name={project.name}
          link={project.link}
          imgPath={project.imgPath}
          onMenu={props.onMenu}
          slide={slide}
        />
      ))}
    </>
  )
}

export default Projects
