import React from "react"
import { motion } from 'framer-motion'

const About: React.FC = () => {
  return (
    <>
      <motion.div
        className="about"

        initial={{
          opacity: 1,
          y: '100%'
        }}
        exit={{
          opacity: 0,
          transition: {
            duration: 0.2
          }
        }}
        animate={{
          y: '0%',
          transition: {
            duration: 0.7,
            delay: 0.6,
            ease: [0.1, 0.2, 0.65, 1]
          }
        }}
      >
        About
        
      </motion.div> 
    </>
  )
}

export default About
