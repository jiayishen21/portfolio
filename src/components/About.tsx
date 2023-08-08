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
          y: 0,
          transition: {
            duration: 0.7,
            delay: 0.6,
            ease: [0.1, 0.2, 0.65, 1]
          }
        }}
      >
        <div className="me">
          <img
            src={`${process.env.PUBLIC_URL}imgs/temp.png`}
            alt='me'
          />
          <div className="me-text">
            <p>
              I'm Jiayi Shen, a Full-Stack Developer with a passion
              for crafting practical applications that bridge imagination and functionality.
            </p>
            <p>
              If you have any ideas in mind, feel free to reach out.
              Let's build something incredible together!
            </p>
          </div>
        </div>
      </motion.div> 
    </>
  )
}

export default About
