import React from "react"
import { motion } from 'framer-motion'

interface Props {
  position: number
  imgPath: string
  slide: (direction: number) => void
  delayedProject: boolean

  onMenu: boolean
  switchMenu: number
}

const Project: React.FC<Props> = (props) => {
  return (
    <>
      <motion.div
        className={`project
          ${
            props.switchMenu > 0 && props.onMenu ? 'project-exit' :
            props.onMenu ? 'transparent' : ''
          }
          ${
            props.switchMenu > 0 && !props.onMenu ? 'project-return' : ''
          }
        `}
        style={{
          x: props.delayedProject ? 0 : `${props.position*100}%`,
          zIndex: props.delayedProject ? -1 : 0,
          transition: props.position !== 0 || props.switchMenu > 0 ? 'transform 0s' : 'transform 0.7s ease'
        }}

        initial={{
          opacity: 0,
          scale: 1.2,
        }}
        exit={{
          opacity: 1,
          zIndex: -1,
          scale: 1,
          transition: {
            opacity: {
              duration: 1.2
            },
          }
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            opacity: {
              duration: 0.3,
              delay: 0.25,
            },
          },
        }}
      >
        <motion.div
          className={
            `project-img
            ${props.switchMenu > 0 && props.onMenu ? 'project-img-exit' : ''}
          `}
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}${props.imgPath}`,
          }}
        >
        </motion.div>
      </motion.div> 
    </>
  )
}

export default Project