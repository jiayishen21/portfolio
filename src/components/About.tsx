import React, { useEffect, useState, useRef } from "react"
import { motion } from 'framer-motion'
import { Link } from "react-router-dom"

interface Props {
  switchPage: number
  initialLoad: boolean
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
    if(props.initialLoad || props.switchPage > 0) {
      return
    }
    setScrolling(true);
    setStartY(e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if(props.initialLoad || props.switchPage > 0) {
      return
    }
    setScrolling(true);
    setStartY(e.touches[0].clientY);
  };

  const handleMove = (clientY: number) => {
    if (!scrolling) return;
    if(!contentRef.current || !containerRef.current) {
      return
    }

    const deltaY = clientY - startY;
    const maxScroll = contentRef.current.scrollHeight - containerRef.current.clientHeight || 0;
    let newScrollY = scrollY - 1.5*deltaY;

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
    if(!contentRef.current || !containerRef.current) {
      return
    }
    if(props.initialLoad || props.switchPage > 0) {
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
    if(!contentRef.current) {
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
    if(!scrollRef.current) {
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
                draggable='false'
              />
            </div> 
          </div>

          <img
            className="university"
            src={`${process.env.PUBLIC_URL}imgs/white-logos/waterloo.png`}
            alt='University of Waterloo'
            draggable='false'
          />

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
          <div className="technologies bot-row">
            <br/>
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
        </div>
      </motion.div> 
    </>
  )
}

export default About
