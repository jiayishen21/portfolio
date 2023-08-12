import React, { useEffect, useState, useRef } from "react"
import { motion } from 'framer-motion'
import { Link } from "react-router-dom"
import Reveal from "./Reveal"
import ImgReveal from "./ImgReveal"
import Nav from "./Nav"

interface Props {
  switchPage: number
  setSwitchPage: React.Dispatch<React.SetStateAction<number>>

  initialLoad: boolean

  page: string
  setPage: React.Dispatch<React.SetStateAction<string>>
}

const About: React.FC<Props> = (props: Props) => {
  /*
  Momentum scrolling
  */
  const [scrolling, setScrolling] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [scrollPercentage, setScrollPercentage] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (props.initialLoad || props.switchPage > 0) {
      return
    }
    setScrolling(true);
    setStartY(e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (props.initialLoad || props.switchPage > 0) {
      return
    }
    setScrolling(true);
    setStartY(e.touches[0].clientY);
  };

  const handleMove = (clientY: number) => {
    if (!scrolling) return;
    if (!contentRef.current || !containerRef.current) {
      return
    }

    const deltaY = clientY - startY;
    const maxScroll = contentRef.current.scrollHeight - containerRef.current.clientHeight || 0;
    let newScrollY = scrollY - 1.5 * deltaY;

    if (newScrollY < 0) {
      newScrollY = 0;
    } else if (newScrollY > maxScroll) {
      newScrollY = maxScroll;
    }

    setScrollY(newScrollY);
    setStartY(clientY);
    setScrollPercentage(newScrollY / maxScroll * 100)
  };

  const handleMouseUp = () => {
    setScrolling(false);
  };

  const handleMoveMouse = (e: MouseEvent) => {
    handleMove(e.clientY);
  };

  const handleMoveTouch = (e: TouchEvent) => {
    handleMove(e.touches[0].clientY);
  };

  useEffect(() => {
    if (scrolling) {
      window.addEventListener('mousemove', handleMoveMouse);
      window.addEventListener('touchmove', handleMoveTouch);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMoveMouse);
      window.removeEventListener('touchmove', handleMoveTouch);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMoveMouse);
      window.removeEventListener('touchmove', handleMoveTouch);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [scrolling]);

  const handleMouseWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!contentRef.current || !containerRef.current) {
      return
    }
    if (props.initialLoad || props.switchPage > 0) {
      return
    }

    const maxScroll = contentRef.current.scrollHeight - containerRef.current.clientHeight || 0;
    let newScrollY = scrollY + event.deltaY;

    if (newScrollY < 0) {
      newScrollY = 0;
    } else if (newScrollY > maxScroll) {
      newScrollY = maxScroll;
    }

    setScrollY(newScrollY)
    setScrollPercentage(newScrollY / maxScroll * 100)
  }

  useEffect(() => {
    if (!contentRef.current) {
      return
    }
    contentRef.current.animate(
      [{ transform: `translateY(-${scrollY}px)` }],
      {
        duration: 1200,
        fill: 'forwards',
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      }
    );
  }, [scrollY])

  useEffect(() => {
    if (!scrollRef.current) {
      return
    }
    scrollRef.current.animate(
      [{ transform: `translateY(-${100 - scrollPercentage}%)` }],
      {
        duration: 1200,
        fill: 'forwards',
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      }
    );

  }, [scrollPercentage])

  return (
    <>
      <Nav
        switchPage={props.switchPage}
        setSwitchPage={props.setSwitchPage}

        page={props.page}
        setPage={props.setPage}
      />
      <motion.div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onWheel={handleMouseWheel}
        className={`about no-scroll ${props.initialLoad ? 'transparent' : ''}`}

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
        <div
          ref={scrollRef}
          className="scrollbar"
        />
        <div
          ref={contentRef}
          className="content"
          style={{ transform: `translateY(-${scrollY}px)` }}
        >
          <div className="me-wrapper">
            <div className="me">
              <div className="me-text">
                <div className="para-spacer">
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height='1.6rem'
                  >
                    <>
                      I'm Jiayi Shen, a Full-Stack
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height='1.6rem'
                  >
                    <>
                      Engineer with a passion for
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height='1.6rem'
                  >
                    <>
                      crafting practical
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height='1.6rem'
                  >
                    <>
                      applications that bridge
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height='1.6rem'
                  >
                    <>
                      imagination and
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height='1.6rem'
                  >
                    <>
                      functionality.
                    </>
                  </Reveal>
                </div>
                <div>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height='1.6rem'
                  >
                    <>
                      If you have any ideas in
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height='1.6rem'
                  >
                    <>
                      mind, feel free to reach out.
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height='1.6rem'
                  >
                    <>
                      Let's build something
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height='1.6rem'
                  >
                    <>
                      incredible together!
                    </>
                  </Reveal>
                </div>
              </div>
              <ImgReveal
                initialLoad={props.initialLoad}
                switchPage={props.switchPage}
              >
                <img
                  src={`${process.env.PUBLIC_URL}imgs/temp.png`}
                  alt='me'
                  draggable='false'
                />
              </ImgReveal>

            </div>
          </div>

          <ImgReveal
            initialLoad={props.initialLoad}
            switchPage={props.switchPage}
          >
            <img
              className="university"
              src={`${process.env.PUBLIC_URL}imgs/white-logos/waterloo.png`}
              alt='University of Waterloo'
              draggable='false'
            />
          </ImgReveal>

          <ImgReveal
            initialLoad={props.initialLoad}
            switchPage={props.switchPage}
          >
            <div className="technologies top-row">
              <img
                src={`${process.env.PUBLIC_URL}imgs/white-logos/postgres2.png`}
                alt="PostgreSQL"
                draggable='false'
              />
              <br />
              <img
                src={`${process.env.PUBLIC_URL}imgs/white-logos/mongodb.png`}
                alt="MongoDB"
                draggable='false'
              />
              <br />
              <img
                src={`${process.env.PUBLIC_URL}imgs/white-logos/python.png`}
                alt="Python"
                draggable='false'
              />
              <br />
              <img
                src={`${process.env.PUBLIC_URL}imgs/white-logos/react.png`}
                alt="React"
                draggable='false'
              />
            </div>
          </ImgReveal>
          <ImgReveal
            initialLoad={props.initialLoad}
            switchPage={props.switchPage}
          >
            <div className="technologies bot-row">
              <br />
              <img
                src={`${process.env.PUBLIC_URL}imgs/white-logos/typescript.png`}
                alt="TypeScript"
                draggable='false'
              />
              <br />
              <img
                src={`${process.env.PUBLIC_URL}imgs/white-logos/next.png`}
                alt="NextJS"
                draggable='false'
              />
              <br />
              <img
                src={`${process.env.PUBLIC_URL}imgs/white-logos/javascript.png`}
                alt="JavaScript"
                draggable='false'
              />
              <br />
            </div>
          </ImgReveal>

          <div
            className="contact"
          >
            <h3>
              <Reveal
                initialLoad={props.initialLoad}
                switchPage={props.switchPage}
                height={'3.5rem'}
              >
                <>
                  Let's Talk
                </>
              </Reveal>
            </h3>
            <ul>
              <li>
                <Reveal
                  initialLoad={props.initialLoad}
                  switchPage={props.switchPage}
                  height="2rem"
                >
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
                </Reveal>
              </li>
              <li>
                <Reveal
                  initialLoad={props.initialLoad}
                  switchPage={props.switchPage}
                  height="2rem"
                >
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
                </Reveal>
              </li>
              <li>
                <Reveal
                  initialLoad={props.initialLoad}
                  switchPage={props.switchPage}
                  height="2rem"
                >
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
                </Reveal>
              </li>
              <li>
                <Reveal
                  initialLoad={props.initialLoad}
                  switchPage={props.switchPage}
                  height="2rem"
                >
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

                </Reveal>
              </li>
            </ul>
          </div>
          <div className="acknowledgements">
            <h3>
              <Reveal
                initialLoad={props.initialLoad}
                switchPage={props.switchPage}
                height={'3.5rem'}
              >
                <>
                  Acknowledgements
                </>
              </Reveal>
            </h3>
            <ul>
              <li>
                <Reveal
                  initialLoad={props.initialLoad}
                  switchPage={props.switchPage}
                  height={'1.8rem'}
                >
                  <>
                    {'Inspired by '}
                    <Link
                      to='https://camillemormal.com/'
                      target="_blank"
                    >
                      camillemormal.com
                    </Link>
                  </>
                </Reveal>
              </li>
              <li>
                <Reveal
                  initialLoad={props.initialLoad}
                  switchPage={props.switchPage}
                  height={'1.8rem'}
                >
                  <>
                    Built by Jiayi Shen using React
                  </>
                </Reveal>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default About
