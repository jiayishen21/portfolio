import React, { useEffect, useState, useRef } from "react";
import Project from "./Project";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Props {
  curProject: number
  setCurProject: React.Dispatch<React.SetStateAction<number>>

  onMenu: boolean
  setOnMenu: React.Dispatch<React.SetStateAction<boolean>>

  percentage: number
  setPercentage: React.Dispatch<React.SetStateAction<number>>

  mouseDown: number | null
  setMouseDown: React.Dispatch<React.SetStateAction<number | null>>
  prevPercentage: number
  setPrevPercentage: React.Dispatch<React.SetStateAction<number>>

  switchPage: number
  setSwitchPage: React.Dispatch<React.SetStateAction<number>>

  page: string
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

  const trackRef = useRef<HTMLDivElement | null>(null);

  const handleMouseWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if(!props.onMenu) {
      props.setOnMenu(true)
      setSwitchMenu(700)
      return
    }
    if(props.switchPage > 0 || switchMenu > 0) {
      return
    }
    if(event.deltaY > 0) {
      props.setPrevPercentage(Math.max(props.percentage - 5, -100))
      props.setPercentage(Math.max(props.percentage - 5, -100))
    }
    else if(event.deltaY < 0) {
      props.setPrevPercentage(Math.max(props.percentage + 5, 0))
      props.setPercentage(Math.min(props.percentage + 5, 0))
    }
  }

  const handleOnDown = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if(!props.onMenu) {
      return
    }

    if ('touches' in event) {
      // Event is a TouchEvent
      props.setMouseDown(event.touches[0].clientX);
    } else {
      // Event is a MouseEvent
      props.setMouseDown(event.clientX);
    }
  }

  const handleOnUp = () => {
    if(!props.onMenu) {
      return
    }

    props.setMouseDown(null)
    props.setPrevPercentage(props.percentage)
  }

  const handleOnMove = (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if(!props.onMenu) {
      return
    }

    if (props.mouseDown === null) return;

    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
    const mouseDelta = props.mouseDown - clientX;
    const maxDelta = window.innerWidth;
    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = (props.prevPercentage || 0) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

    props.setPercentage(nextPercentage)

  };

  const [switchMenu, setSwitchMenu] = useState<number>(0)

  useEffect(() => {
    const resetDelay = () => {
      setSwitchMenu(0)
    }

    if(switchMenu > 0) {
      const timeoutId = setTimeout(resetDelay, switchMenu)

      return () => clearTimeout(timeoutId)
    }
  }, [switchMenu])

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    // TODO: Clean up animation so that loading menu and scrolling animation don't coincide
    // Position solutions include only doing translateX and setting -50% Y position by default

    if(props.switchPage > 0 && props.page === '/') {
      track.animate(
        [
          { transform: `translate(${props.percentage}%, -150%)` },
          { transform: `translate(${props.percentage}%, -50%)` }
        ],
        {
          duration: 2300,
          fill: 'forwards',
          delay: 100,
          easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        }
      );

      const images = Array.from(track.getElementsByClassName('image'));
      for (const i in images) {
        (images[i] as HTMLElement).animate(
          [
            { objectPosition: `${100 + props.percentage}% center` },
          ],
          { duration: 0, fill: 'forwards' }
        );

        (images[i] as HTMLElement).animate(
          [
            { transform: `translateY(-120%)` },
            { transform: `translateY(0)` }
          ],
          {
            duration: 1000,
            fill: 'forwards',
            delay:  100 + parseInt(i) * 75,
            easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
          }
        );
      }
    }

    else if(switchMenu > 0) {
      track.animate(
        [
          { transform: `translate(${props.percentage}%, -250%)` },
          { transform: `translate(${props.percentage}%, -50%)` }
        ],
        {
          duration: 1500,
          fill: 'forwards',
          delay: 0,
          easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        }
      );

      const images = Array.from(track.getElementsByClassName('image'));
      for (const i in images) {
        (images[i] as HTMLElement).animate(
          [
            { objectPosition: `${100 + props.percentage}% center` },
          ],
          { duration: 0, fill: 'forwards' }
        );

        (images[i] as HTMLElement).animate(
          [
            { transform: `translateY(-120%)` },
            { transform: `translateY(0)` }
          ],
          {
            duration: 1000,
            fill: 'forwards',
            delay:  parseInt(i) * 75,
            easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
          }
        );
      }

    }

    else if(props.onMenu && props.page === '/about' && props.switchPage > 0) {
      track.animate(
        [
          { transform: `translate(${props.percentage}%, -50%)` },
          { transform: `translate(${props.percentage}%, -150%)` }
        ],
        {
          duration: 1300,
          fill: 'forwards',
          easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        }
      );

      const images = Array.from(track.getElementsByClassName('image'));
      for (const i in images) {
        (images[i] as HTMLElement).animate(
          [
            { transform: `translateY(-80%)` },
          ],
          { 
            duration: 1000,
            fill: 'forwards', 
            delay: parseInt(i)*75,
            easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
          }
        );
      }
    }

    else {
      track.animate(
        [{ transform: `translate(${props.percentage}%, -50%)` }],
        { duration: 1000, fill: 'forwards' }
      );

      const images = Array.from(track.getElementsByClassName('image'));
      for (const image of images) {
        (image as HTMLElement).animate(
          [{ objectPosition: `${100 + props.percentage}% center` }],
          { duration: 1000, fill: 'forwards' }
        );
      }
    }
  }, [props.percentage, props.switchPage, props.page, switchMenu])

  return (
    <>
      <div
        onWheel={handleMouseWheel}
        onMouseDown={handleOnDown}
        onTouchStart={handleOnDown}
        onMouseUp={handleOnUp}
        onTouchEnd={handleOnUp}
        onMouseMove={handleOnMove}
        onTouchMove={handleOnMove}
      >
        <div
          ref={trackRef}
          className={
            `image-track ${
            (props.onMenu && props.page === '/' && props.switchPage === 0) ||
            (props.onMenu && props.page === '/about' && props.switchPage > 0)
            ? '' : 'none'}`
          }
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
