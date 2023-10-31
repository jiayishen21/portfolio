import React, { useEffect, useState, useRef } from "react"
import { motion } from 'framer-motion'
import { Link } from "react-router-dom"
import Reveal from "../Reveal"
import ImgReveal from "../ImgReveal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons"

interface Props {
  switchPage: number
  setSwitchPage: React.Dispatch<React.SetStateAction<number>>

  page: string
  setPage: React.Dispatch<React.SetStateAction<string>>

  initialLoad: boolean

  setCurProject: React.Dispatch<React.SetStateAction<number>>
  setOnMenu: React.Dispatch<React.SetStateAction<boolean>>
}

interface heights {
  projectName: string
  roleTitle: string
  roleDesc: string
  builtWith: string

  reflectionsTitle: string
  reflectionsPoint: string

  nextProjectTitle: string
  nextProject: string
}

const SlimeScholars: React.FC<Props> = (props: Props) => {
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
    if (screenWidth <= 767) {
      return
    }
    setScrolling(true);
    setStartY(e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (props.initialLoad || props.switchPage > 0) {
      return
    }
    if (screenWidth <= 767) {
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
    if (screenWidth <= 767) {
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
    if (screenWidth <= 767) {
      return
    }
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
    if (screenWidth <= 767) {
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
    if (screenWidth <= 767) {
      contentRef.current.animate(
        [{ transform: `translateY(0px)` }],
        {
          duration: 0,
        }
      );
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
    if (screenWidth <= 767) {
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

  const scrollDown = () => {
    if (!containerRef.current || !contentRef.current) {
      return
    }
    const maxScroll = contentRef.current.scrollHeight - containerRef.current.clientHeight || 0;
    let newScrollY = containerRef.current.clientHeight || 0

    if (newScrollY < 0) {
      newScrollY = 0;
    } else if (newScrollY > maxScroll) {
      newScrollY = maxScroll;
    }
    setScrollY(newScrollY)
    setScrollPercentage(newScrollY / maxScroll * 100)
  }

  const redirect = () => {
    if (screenWidth > 767) {
      props.setOnMenu(false)
      props.setCurProject(1)
      props.setSwitchPage(700)
      props.setPage('/')
    }
    else {
      props.setSwitchPage(700)
      props.setPage('/visual-sorting-algorithms')
    }
    // TODO: Double check if PassionFruitYouth at index 1
  }

  // Screen size
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [])

  const defaultHeights: heights = {
    projectName: '4rem',
    roleTitle: '2rem',
    roleDesc: '1.6rem',
    builtWith: '2.3rem',

    reflectionsTitle: '4rem',
    reflectionsPoint: '2rem',

    nextProjectTitle: '4rem',
    nextProject: '2.3rem',
  }

  const [heights, setHeights] = useState<heights>(defaultHeights)

  useEffect(() => {
    if (screenWidth > 1200) {
      setHeights({
        projectName: '4rem',
        roleTitle: '2rem',
        roleDesc: '1.6rem',
        builtWith: '2.3rem',

        reflectionsTitle: '4rem',
        reflectionsPoint: '1.3rem',

        nextProjectTitle: '4rem',
        nextProject: '2.3rem',
      })
    }
    if (screenWidth > 1023) {
      setHeights({
        projectName: '4rem',
        roleTitle: '2rem',
        roleDesc: '1.6rem',
        builtWith: '2.3rem',

        reflectionsTitle: '4rem',
        reflectionsPoint: '2rem',

        nextProjectTitle: '4rem',
        nextProject: '2.3rem',
      })
    }
    else if (screenWidth > 767) {
      setHeights({
        projectName: '3.2rem',
        roleTitle: '1.45rem',
        roleDesc: '1.45rem',
        builtWith: '1.75rem',

        reflectionsTitle: '3.2rem',
        reflectionsPoint: '1.8rem',

        nextProjectTitle: '3.2rem',
        nextProject: '2.3rem',
      })
    }
    else if (screenWidth > 480) {
      setHeights({
        projectName: '6vw',
        roleTitle: 'calc((6vw - 0.5rem)*0.75 + 0.25rem)',
        roleDesc: 'calc((5.5vw - 0.3rem)*0.5 + 0.2rem)',
        builtWith: 'calc((6vw - 0.5rem)*0.75 + 0.5rem)',

        reflectionsTitle: '6vw',
        reflectionsPoint: 'calc((5.5vw - 0.3rem)*0.5 + 0.2rem',

        nextProjectTitle: '3rem',
        nextProject: 'calc((10vw - 0.25rem)*0.6 + 0.3rem)',
      })
    }
    else {
      setHeights({
        projectName: 'calc(10vw + 1rem)',
        roleTitle: 'calc((10vw - 0.25rem)*0.6 + 0.5rem)',
        roleDesc: 'calc((12vw - 0.2rem)/3 + 0.3rem)',
        builtWith: 'calc((10vw - 0.25rem)*0.6 + 0.5rem)',

        reflectionsTitle: 'calc(12vw + 0.2rem)',
        reflectionsPoint: 'calc((12vw - 0.2rem)/3 + 0.3rem)',

        nextProjectTitle: '3rem',
        nextProject: 'calc((10vw - 0.25rem)*0.6 + 0.3rem)',
      })
    }
  }, [screenWidth])

  return (
    <>
      <motion.div
        ref={containerRef}
        onMouseDown={screenWidth > 767 ? handleMouseDown : () => null}
        onTouchStart={screenWidth > 767 ? handleTouchStart : () => null}
        onWheel={screenWidth > 767 ? handleMouseWheel : () => null}
        className={`project-page ${screenWidth > 767 ? 'no-scroll' : ''} ${props.initialLoad ? 'transparent' : ''}`}

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
        {screenWidth > 767 &&
          <div
            ref={scrollRef}
            className="scrollbar"
          />
        }
        <div
          ref={contentRef}
          className="content"
          style={{ transform: `translateY(-${screenWidth > 767 ? scrollY : 0}px)` }}
        >
          <div className="layout1">
            <ImgReveal
              initialLoad={props.initialLoad}
              switchPage={props.switchPage}
            >
              <img
                src={`${process.env.PUBLIC_URL}imgs/slime-scholars/main.png`}
                alt='slime scholars picture'
                draggable='false'
              />
            </ImgReveal>
            <div className="layout-text">
              <div className="para-spacer">
                <Link
                  to='https://www.slimescholars.com/'
                  target="_blank"
                  draggable="false"
                >
                  {(screenWidth > 480 && screenWidth <= 767) ? <>
                    <Reveal
                      initialLoad={props.initialLoad}
                      switchPage={props.switchPage}
                      height={heights.projectName}
                    >
                      <h1>
                        Slime Scholars
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                      </h1>
                    </Reveal>
                  </> : <>
                    <Reveal
                      initialLoad={props.initialLoad}
                      switchPage={props.switchPage}
                      height={heights.projectName}
                    >
                      <h1>
                        Slime Scholars
                      </h1>
                    </Reveal>
                  </>
                  }
                </Link>
                <div className="role-title">
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={heights.roleTitle}
                  >
                    <>
                      Co-Founder &
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={heights.roleTitle}
                  >
                    <>
                      Full-Stack Developer
                    </>
                  </Reveal>
                </div>
                <div className="role-description">
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={heights.roleDesc}
                  >
                    <>
                      Slime Scholars is a educational platform
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={heights.roleDesc}
                  >
                    <>
                      that takes addictive components from
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={heights.roleDesc}
                  >
                    <>
                      games and applies them to encourage
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={heights.roleDesc}
                  >
                    <>
                      learning
                    </>
                  </Reveal>
                </div>
                <button
                  className="built-with"
                  onClick={scrollDown}
                >
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={heights.builtWith}
                  >
                    <>
                      Built with React,
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={heights.builtWith}
                  >
                    <>
                      Next, & Node
                      <FontAwesomeIcon icon={faArrowDown} />
                    </>
                  </Reveal>
                </button>
              </div>
            </div>
          </div>

          <div className="reflections">
            <div>
              <Reveal
                initialLoad={props.initialLoad}
                switchPage={props.switchPage}
                height={heights.reflectionsTitle}
              >
                <h3>
                  Challenges
                </h3>
              </Reveal>
              <ul>
                <li>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={heights.reflectionsPoint}
                  >
                    <>
                      Managing and motivating a team
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={heights.reflectionsPoint}
                  >
                    <>
                      of 9 developers, which required
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={heights.reflectionsPoint}
                  >
                    <>
                      branching and merging code and
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={heights.reflectionsPoint}
                  >
                    <>
                      effective communication.
                    </>
                  </Reveal>
                </li>
                <li>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={heights.reflectionsPoint}
                  >
                    <>
                      Protecting user data using RSA,
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={heights.reflectionsPoint}
                  >
                    <>
                      bcrypt hashing, and JWT.
                    </>
                  </Reveal>
                </li>
                <li>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={heights.reflectionsPoint}
                  >
                    <>
                      Asynchronously saving local data
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={heights.reflectionsPoint}
                  >
                    <>
                      to the cloud to hide API latency.
                    </>
                  </Reveal>
                </li>
              </ul>
            </div>

            <div>
              <Reveal
                initialLoad={props.initialLoad}
                switchPage={props.switchPage}
                height={heights.reflectionsTitle}
              >
                <h3>
                  What I Learned
                </h3>
              </Reveal>
              <ul>
                <li>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={heights.reflectionsPoint}
                  >
                    <>
                      Building microservices-based APIs.
                    </>
                  </Reveal>
                </li>
                <li>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={heights.reflectionsPoint}
                  >
                    <>
                      Using formidable and Cloudinary for
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={heights.reflectionsPoint}
                  >
                    <>
                      cheap file upload and storage.
                    </>
                  </Reveal>
                </li>
                <li>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={heights.reflectionsPoint}
                  >
                    <>
                      Optimizing MongoDB data models
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={heights.reflectionsPoint}
                  >
                    <>
                      and queries for performance.
                    </>
                  </Reveal>
                </li>
                <li>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={heights.reflectionsPoint}
                  >
                    <>
                      Deploying a Next.js app with AWS.
                    </>
                  </Reveal>
                </li>
              </ul>
            </div>
          </div>

          <div className="pictures-wrapper">
            <div className="pictures">
              <ImgReveal
                initialLoad={props.initialLoad}
                switchPage={props.switchPage}
              >
                <img
                  src={`${process.env.PUBLIC_URL}imgs/slime-scholars/0.png`}
                  alt='slime scholars play page'
                  draggable='false'
                />
              </ImgReveal>
              <ImgReveal
                initialLoad={props.initialLoad}
                switchPage={props.switchPage}
              >
                <img
                  src={`${process.env.PUBLIC_URL}imgs/slime-scholars/1.png`}
                  alt='slime scholars roll page'
                  draggable='false'
                />
              </ImgReveal>
              <ImgReveal
                initialLoad={props.initialLoad}
                switchPage={props.switchPage}
              >
                <img
                  src={`${process.env.PUBLIC_URL}imgs/slime-scholars/2.png`}
                  alt='slime scholars inventory page'
                  draggable='false'
                />
              </ImgReveal>
              <ImgReveal
                initialLoad={props.initialLoad}
                switchPage={props.switchPage}
              >
                <img
                  src={`${process.env.PUBLIC_URL}imgs/slime-scholars/3.png`}
                  alt='slime scholars lesson selection'
                  draggable='false'
                />
              </ImgReveal>
              <ImgReveal
                initialLoad={props.initialLoad}
                switchPage={props.switchPage}
              >
                <img
                  src={`${process.env.PUBLIC_URL}imgs/slime-scholars/4.png`}
                  alt='slime scholars learn'
                  draggable='false'
                />
              </ImgReveal>
            </div>
          </div>

          <div className="next-project-wrapper">
            <button
              className="next-project"
              onClick={redirect}
            >
              <ImgReveal
                initialLoad={props.initialLoad}
                switchPage={props.switchPage}
              >
                <img
                  src={`${process.env.PUBLIC_URL}imgs/slime-scholars/next-project.png`}
                  alt='visual sorting algorithms'
                  draggable='false'
                />
              </ImgReveal>

              <div className="text-centering">
                <Reveal
                  initialLoad={props.initialLoad}
                  switchPage={props.switchPage}
                  height={heights.nextProjectTitle}
                >
                  <h2>
                    Visual Sorting Algorithms
                  </h2>
                </Reveal>
                <div
                  className="reveal-container"
                  style={{ height: heights.nextProject }}
                >
                  <h4>
                    Next Project
                  </h4>
                </div>
              </div>
            </button>

          </div>

        </div>
      </motion.div >
    </>
  )
}

export default SlimeScholars

