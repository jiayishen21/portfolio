import React, { useEffect, useState } from "react"
import { motion } from 'framer-motion'
import { Link } from "react-router-dom";

interface Props {
  name: string
  link: string
  position: number
  imgPath: string
  onMenu: boolean
  slide: (direction: number) => void
  delayedProject: boolean
}

const Project: React.FC<Props> = (props) => {
  
  return (
    <>
      <motion.div
        className='project'
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}${props.imgPath}`,
          x: props.delayedProject ? 0 : `${props.position*100}%`,
          zIndex: props.delayedProject ? -1 : 0,
          transition: props.position === 0 ? 'transform 1s ease' : 'transform 0s'
        }}

        initial={{
          opacity: 0,
          backgroundSize: '120%',
        }}
        exit={{
          opacity: 1,
          zIndex: -1,
          backgroundSize: '100%',
          transition: {
            backgroundSize: {
              duration: 0.9,
            }
          }
        }}
        animate={{
          opacity: 1,
          backgroundSize: '100%',
          transition: {
            opacity: {
              duration: 0.3,
              delay: 0.25,
            },
            backgroundSize: {
              duration: 0.7,
              delay: 0.3,
            },
          },
        }}
      >
      </motion.div> 
    </>
  )
}

export default Project