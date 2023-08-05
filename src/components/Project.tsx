import React, { useEffect, useState } from "react"
import { motion } from 'framer-motion'

interface Props {
  position: number
  imgPath: string
  slide: (direction: number) => void
  delayedProject: boolean

  onMenu: boolean
}

const Project: React.FC<Props> = (props) => {
  
  return (
    <>
      <motion.div
        className='project'
        style={{
          x: props.delayedProject ? 0 : `${props.position*100}vw`,
          zIndex: props.delayedProject ? -1 : 0,
          transition: props.position === 0 ? 'transform 0.7s ease' : 'transform 0s'
        }}

        initial={{
          opacity: 0,
          scale: 1.2,
        }}
        exit={{
          opacity: 1,
          zIndex: -1,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          transition: {
            opacity: {
              duration: 0.3,
              delay: 0.25,
            },
            scale: {
              duration: 0.7,
              delay: 0.3,
            },
          },
        }}
      >
        <motion.div
          className="project-img"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}${props.imgPath}`,
          }}

          initial={{
            scale: 1.2
          }}
          animate={{
            scale: 1,
            transition: {
              scale: {
                duration: 0.7,
                delay: 0.3,
              }
            }
          }}
        >
        </motion.div>
      </motion.div> 
    </>
  )
}

export default Project