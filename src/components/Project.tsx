import React from "react"
import { motion } from 'framer-motion'
import { Link } from "react-router-dom";

interface Props {
  name: string;
  link: string;
}

const Project: React.FC<Props> = (props) => {
  return (
    <>
      <motion.div
        className='project'

        initial={{
          opacity: 0
        }}
        exit={{
          opacity: 1,
          zIndex: -1,
          transition: {
            duration: 0.9,
          }
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.3,
            delay: 0.6,
          }
        }}
      >
        <Link to={props.link}>
          <div className="text-animation-container">
            <motion.h1
              initial={{ y: '400%' }}
              animate={{ y: 0, transition: {
                duration: 1.5, delay: 0.5, ease: 'easeInOut'
              } }}
              exit={{
                y: '-400%',
                transition: {
                  duration: 1.5,
                }
              }}
            >
              {props.name}
            </motion.h1>
          </div>
        </Link>
      </motion.div> 
    </>
  )
}

export default Project