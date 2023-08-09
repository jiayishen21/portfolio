import React, { useEffect, useState } from "react"
import { motion } from 'framer-motion'
import { Link } from "react-router-dom"

interface Props {
  switchPage: number
  initialLoad: boolean
}

const About: React.FC<Props> = (props: Props) => {
  return (
    <>  
      <motion.div
        className={`about ${props.switchPage > 0 ? 'no-scroll' : ''} ${props.initialLoad ? 'transparent' : ''}`}

        initial={{
          opacity: 1,
          y: props.switchPage > 0 ? '100%' : ''
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
            duration: 0.8,
            delay: 0.4,
            ease: [0.1, 0.2, 0.65, 1]
          }
        }}
      >
        <div className="me-wrapper">
          <div className="me">
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
            <motion.img
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 0.5,
                  delay: 1.5,
                }
              }}
              src={`${process.env.PUBLIC_URL}imgs/temp.png`}
              alt='me'
            />
          </div> 
        </div>

        <img
          className="university"
          src={`${process.env.PUBLIC_URL}imgs/white-logos/waterloo.png`}
          alt='University of Waterloo'
        />

        <div className="technologies top-row">
          <img
            src={`${process.env.PUBLIC_URL}imgs/white-logos/postgres2.png`}
            alt="PostgreSQL"
          />
          <br />
          <img
            src={`${process.env.PUBLIC_URL}imgs/white-logos/mongodb.png`}
            alt="MongoDB"
          />
          <br />
          <img
            src={`${process.env.PUBLIC_URL}imgs/white-logos/python.png`}
            alt="Python"
          />
          <br />
          <img
            src={`${process.env.PUBLIC_URL}imgs/white-logos/react.png`}
            alt="React"
          />
        </div>
        <div className="technologies bot-row">
          <br/>
          <img
            src={`${process.env.PUBLIC_URL}imgs/white-logos/typescript.png`}
            alt="TypeScript"
          />
          <br />
          <img
            src={`${process.env.PUBLIC_URL}imgs/white-logos/next.png`}
            alt="NextJS"
          />
          <br />
          <img
            src={`${process.env.PUBLIC_URL}imgs/white-logos/javascript.png`}
            alt="JavaScript"
          />
          <br />
        </div>

        <div
          className="contact"
        >
          <h3>
            Let's Talk
          </h3>
          <ul>
            <li>
              <Link
                to="mailto:lucasshen21@gmail.com"
                target="_blank"
                draggable='false'
              >
                Email
                <span>
                  <div className="full-contact">
                    lucasshen21@gmail.com
                  </div>
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="https://www.instagram.com/lucas.shen21/"
                target="_blank"
              >
                Instagram
                <span>
                  <div className="full-contact">
                    @lucas.shen21
                  </div>
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="https://github.com/jiayishen21"
                target="_blank"
              >
                GitHub
                <span>
                  <div className="full-contact">
                    jiayishen21
                  </div>
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="https://www.linkedin.com/in/jiayi-shen-8b5035209/"
                target="_blank"
              >
                LinkedIn
                <span>
                  <div className="full-contact">
                    Jiayi Shen
                  </div>
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="acknowledgements">
          <h3>
            Acknowledgements
          </h3>
          <ul>
            <li>
              {'Inspired by '}
              <Link 
                to='https://camillemormal.com/'
                target="_blank"
              >
                camillemormal.com
              </Link>
            </li>
            <li>
              Built by Jiayi Shen using React
            </li>
          </ul>
        </div>
      </motion.div> 
    </>
  )
}

export default About
