import React, { useEffect, useState, useRef } from "react";
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

  const handleMouseWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    // TODO: Control scrollPosition to be between 0 and 100
    if(!props.onMenu) {
      props.setOnMenu(true)
    }
    if(event.deltaY > 0) {
      props.setScrollPosition(props.scrollPosition + 1)
    }
    else if(event.deltaY < 0) {
      props.setScrollPosition(props.scrollPosition - 1)
    }
  }

  /*
  =======================================
  onMenu part
  =======================================
  */
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    let mouseDownAt: number | null = null;
    let prevPercentage: number | null = 0;

    const handleOnDown = (e: MouseEvent | TouchEvent) => {
      if (e instanceof MouseEvent) {
        mouseDownAt = e.clientX;
      } else if (e.touches.length > 0) {
        mouseDownAt = e.touches[0].clientX;
      }
    };

    const handleOnUp = () => {
      mouseDownAt = null;
      prevPercentage = parseInt(track.dataset.percentage || '0')
    };

    const handleOnMove = (e: MouseEvent | TouchEvent) => {
      if (mouseDownAt === null) return;

      const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      const mouseDelta = mouseDownAt - clientX;
      const maxDelta = window.innerWidth / 2;
      const percentage = (mouseDelta / maxDelta) * -100;
      const nextPercentageUnconstrained = (prevPercentage || 0) + percentage;
      const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

      track.dataset.percentage = nextPercentage.toString()

      track.animate(
        [{ transform: `translate(${nextPercentage}%, -50%)` }],
        { duration: 1200, fill: 'forwards' }
      );

      const images = Array.from(track.getElementsByClassName('image'));
      for (const image of images) {
        (image as HTMLElement).animate(
          [{ objectPosition: `${100 + nextPercentage}% center` }],
          { duration: 1200, fill: 'forwards' }
        );
      }
    };

    window.addEventListener('mousedown', handleOnDown);
    window.addEventListener('touchstart', handleOnDown);
    window.addEventListener('mouseup', handleOnUp);
    window.addEventListener('touchend', handleOnUp);
    window.addEventListener('mousemove', handleOnMove);
    window.addEventListener('touchmove', handleOnMove);

    return () => {
      window.removeEventListener('mousedown', handleOnDown);
      window.removeEventListener('touchstart', handleOnDown);
      window.removeEventListener('mouseup', handleOnUp);
      window.removeEventListener('touchend', handleOnUp);
      window.removeEventListener('mousemove', handleOnMove);
      window.removeEventListener('touchmove', handleOnMove);
    };
  }, []);

  /*
  =======================================
  End of onMenu
  =======================================
  */
 
  return (
    <>
      <div
        onWheel={handleMouseWheel}
      >
        <div
          id='image-track'
          ref={trackRef}
          className={props.onMenu ? '' : 'none'}


        >
          <img className="image" src="https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
          <img className="image" src="https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" draggable="false" />
          <img className="image" src="https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
          <img className="image" src="https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" draggable="false" />
          <img className="image" src="https://images.unsplash.com/photo-1524781289445-ddf8f5695861?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" draggable="false" />
          <img className="image" src="https://images.unsplash.com/photo-1610194352361-4c81a6a8967e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80" draggable="false" />
        </div>

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

      </div>
    </>
  )
}

export default Projects
