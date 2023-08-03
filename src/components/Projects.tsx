import React, { useEffect } from "react";
import Project from "./Project";

interface Props {
  curProject: number | undefined
  setCurProject: React.Dispatch<React.SetStateAction<number | undefined>>
  scrollPosition: number
  // setScrollPosition: React.Dispatch<React.SetStateAction<number>>
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
  ]

  const handleScroll = (e: any) => {
    if(e.deltaY > 0) {
      props.setCurProject(1)
    }
    else {
      props.setCurProject(0)
    }

    /*
    if(props.curProject !== undefined) {
      props.setCurProject(undefined)
    }
    */
  }

  useEffect(() => {
    window.addEventListener('mousewheel', handleScroll)
    return () => {
      window.removeEventListener('mousewheel', handleScroll)
    }
  }, [])
  
  return (
    <>
      {projects.map((project, index) => (
        <Project
          key={project.name}
          position={props.curProject === undefined ? 0 : index - props.curProject}
          name={project.name}
          link={project.link}
          imgPath={project.imgPath}
        />
      ))}
    </>
  )
}

export default Projects
