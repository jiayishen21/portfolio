import React from "react"
import { motion } from 'framer-motion'


interface Props {
  switchPage: number
}

const About: React.FC<Props> = (props: Props) => {
  return (
    <>
      <motion.div
        className={`about ${props.switchPage > 0 ? 'no-scroll' : ''}`}

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
        About <br/>
      </motion.div> 
    </>
  )
}

export default About
