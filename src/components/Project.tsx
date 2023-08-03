import React, { useEffect, useState } from "react"
import { motion } from 'framer-motion'
import { Link } from "react-router-dom";

interface Props {
  name: string
  link: string
  position: number
  imgPath: string
}

const Project: React.FC<Props> = (props) => {
  return (
    <>
      <motion.div
        className='project'
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}${props.imgPath}`,
          x: `${props.position*100}%`,
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
            duration: 0.9,
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
        <Link to={props.link}>
          <div className="text-animation-container">
            <motion.h1
              initial={{ y: '400%' }}
              animate={{ y: 0, transition: {
                duration: 1.5, delay: 0.3, ease: 'easeInOut'
              } }}
              exit={{
                y: '-400%',
                transition: {
                  duration: 1.5,
                }
              }}
            >
              {props.name}
              {props.position}
            </motion.h1>
          </div>
        </Link>

      </motion.div> 
    </>
  )
}

export default Project