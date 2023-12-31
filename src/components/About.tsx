import React, { useEffect, useState, useRef } from "react"
import { motion } from 'framer-motion'
import { Link } from "react-router-dom"
import Reveal from "./Reveal"
import ImgReveal from "./ImgReveal"

interface Props {
  switchPage: number
  initialLoad: boolean
  page: string
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
        [{ transform: `translateY(0)` }],
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

  return (
    <>
      <motion.div
        ref={containerRef}
        onMouseDown={screenWidth > 767 ? handleMouseDown : () => null}
        onTouchStart={screenWidth > 767 ? handleTouchStart : () => null}
        onWheel={screenWidth > 767 ? handleMouseWheel : () => null}
        className={`about ${screenWidth > 767 ? 'no-scroll' : ''} ${props.initialLoad ? 'transparent' : ''}`}

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
        {
          screenWidth > 767 &&
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
          <div className="me-wrapper">
            <div className="me">
              {screenWidth <= 480 &&
                <>
                  <ImgReveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}imgs/me2.png`}
                      alt='me'
                      draggable='false'
                    />
                  </ImgReveal>
                  <div className="me-text">
                    <div className="para-spacer">
                      <Reveal
                        initialLoad={props.initialLoad}
                        switchPage={props.switchPage}
                        height='calc((4vw - 0.15rem(*1.3)'
                      >
                        <>
                          I'm Lucas Shen, a Full-Stack Engineer with
                        </>
                      </Reveal>
                      <Reveal
                        initialLoad={props.initialLoad}
                        switchPage={props.switchPage}
                        height='calc((4vw - 0.15rem(*1.3)'
                      >
                        <>
                          a passion for crafting practical applications
                        </>
                      </Reveal>
                      <Reveal
                        initialLoad={props.initialLoad}
                        switchPage={props.switchPage}
                        height='calc((4vw - 0.15rem(*1.3)'
                      >
                        <>
                          that brdige imagination and reality.
                        </>
                      </Reveal>
                    </div>
                    <div>
                      <Reveal
                        initialLoad={props.initialLoad}
                        switchPage={props.switchPage}
                        height='calc((4vw - 0.15rem(*1.3)'
                      >
                        <>
                          If you have any ideas in mind, feel free to
                        </>
                      </Reveal>
                      <Reveal
                        initialLoad={props.initialLoad}
                        switchPage={props.switchPage}
                        height='calc((4vw - 0.15rem)*1.3)'
                      >
                        <>
                          reach out. Let's build something incredible
                        </>
                      </Reveal>
                      <Reveal
                        initialLoad={props.initialLoad}
                        switchPage={props.switchPage}
                        height='calc((4vw - 0.15rem(*1.3)'
                      >
                        <>
                          together.
                        </>
                      </Reveal>
                    </div>
                  </div>
                </>
              }
              {screenWidth > 480 && screenWidth <= 767 &&
                <>
                  <ImgReveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}imgs/me2.png`}
                      alt='me'
                      draggable='false'
                    />
                  </ImgReveal>
                  <div className="me-text">
                    <div className="para-spacer">
                      <Reveal
                        initialLoad={props.initialLoad}
                        switchPage={props.switchPage}
                        height='calc((3.3vw - 0.15rem)*1.3)'
                      >
                        <>
                          I'm Lucas Shen, a Full-Stack Engineer with a
                        </>
                      </Reveal>
                      <Reveal
                        initialLoad={props.initialLoad}
                        switchPage={props.switchPage}
                        height='calc((3.3vw - 0.15rem)*1.3)'
                      >
                        <>
                          passion for crafting practical applications
                        </>
                      </Reveal>
                      <Reveal
                        initialLoad={props.initialLoad}
                        switchPage={props.switchPage}
                        height='calc((3.3vw - 0.15rem)*1.3)'
                      >
                        <>
                          that bridge imagination and reality.
                        </>
                      </Reveal>
                    </div>
                    <div>
                      <Reveal
                        initialLoad={props.initialLoad}
                        switchPage={props.switchPage}
                        height='calc((3.3vw - 0.15rem)*1.3)'
                      >
                        <>
                          If you have any ideas in mind, feel free to reach
                        </>
                      </Reveal>
                      <Reveal
                        initialLoad={props.initialLoad}
                        switchPage={props.switchPage}
                        height='calc((3.3vw - 0.15rem)*1.3)'
                      >
                        <>
                          out. Let's build something incredible together.
                        </>
                      </Reveal>
                    </div>
                  </div>
                </>
              }
              {screenWidth > 767 && screenWidth <= 1023 &&
                <>
                  <ImgReveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}imgs/me2.png`}
                      alt='me'
                      draggable='false'
                    />
                  </ImgReveal>
                  <div className="me-text">
                    <div className="para-spacer">
                      <Reveal
                        initialLoad={props.initialLoad}
                        switchPage={props.switchPage}
                        height='1.3rem'
                      >
                        <>
                          I'm Lucas Shen, a Full-Stack Engineer with a passion
                        </>
                      </Reveal>
                      <Reveal
                        initialLoad={props.initialLoad}
                        switchPage={props.switchPage}
                        height='1.3rem'
                      >
                        <>
                          for crafting practical applications that bridge
                        </>
                      </Reveal>
                      <Reveal
                        initialLoad={props.initialLoad}
                        switchPage={props.switchPage}
                        height='1.3rem'
                      >
                        <>
                          imagination and functionality.
                        </>
                      </Reveal>
                    </div>
                    <div>
                      <Reveal
                        initialLoad={props.initialLoad}
                        switchPage={props.switchPage}
                        height='1.3rem'
                      >
                        <>
                          If you have any ideas in mind, feel free to reach out.
                        </>
                      </Reveal>
                      <Reveal
                        initialLoad={props.initialLoad}
                        switchPage={props.switchPage}
                        height='1.3rem'
                      >
                        <>
                          Let's build something incredible together!
                        </>
                      </Reveal>
                    </div>
                  </div>
                </>
              }
              {screenWidth >= 1024 &&
                <>
                  <div className="me-text">
                    <div className="para-spacer">
                      <Reveal
                        initialLoad={props.initialLoad}
                        switchPage={props.switchPage}
                        height='1.6rem'
                      >
                        <>
                          I'm Lucas Shen, a Full-Stack
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
                      src={`${process.env.PUBLIC_URL}imgs/me.png`}
                      alt='me'
                      draggable='false'
                    />
                  </ImgReveal>
                </>
              }
            </div>
          </div>

          <div className="university-wrapper">
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

          </div>

          <ImgReveal
            initialLoad={props.initialLoad}
            switchPage={props.switchPage}
          >
            <div className="technologies top-row-icons">
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

          {screenWidth <= 480 && <></>}
          {screenWidth > 480 && screenWidth <= 767 && <>
            <Reveal
              initialLoad={props.initialLoad}
              switchPage={props.switchPage}
              height='1.2rem'
            >
              <div className="technologies top-row-text">
                <div>PostgreSQL</div>
                <br />
                <div>MongoDB</div>
                <br />
                <div>Python</div>
                <br />
                <div>React</div>
              </div>
            </Reveal>
          </>}
          {screenWidth > 767 && screenWidth <= 1023 && <>
            <Reveal
              initialLoad={props.initialLoad}
              switchPage={props.switchPage}
              height='1.4rem'
            >
              <div className="technologies top-row-text">
                <div>PostgreSQL</div>
                <br />
                <div>MongoDB</div>
                <br />
                <div>Python</div>
                <br />
                <div>React</div>
              </div>
            </Reveal>
          </>}
          {screenWidth >= 1024 && <>
            <Reveal
              initialLoad={props.initialLoad}
              switchPage={props.switchPage}
              height='1.6rem'
            >
              <div className="technologies top-row-text">
                <div>PostgreSQL</div>
                <br />
                <div>MongoDB</div>
                <br />
                <div>Python</div>
                <br />
                <div>React</div>
              </div>
            </Reveal>
          </>}

          <ImgReveal
            initialLoad={props.initialLoad}
            switchPage={props.switchPage}
          >
            <div className="technologies bot-row-icons">
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
                src={`${process.env.PUBLIC_URL}imgs/white-logos/express.png`}
                alt="Express"
                draggable='false'
              />
              <br />
            </div>
          </ImgReveal>

          {screenWidth <= 480 && <></>}
          {screenWidth > 480 && screenWidth <= 767 && <>
            <Reveal
              initialLoad={props.initialLoad}
              switchPage={props.switchPage}
              height='1.2rem'
            >
              <div className="technologies bot-row-text">
                <br />
                <div>TypeScript</div>
                <br />
                <div>Next JS</div>
                <br />
                <div>Express</div>
                <br />
              </div>
            </Reveal>
          </>}
          {screenWidth > 767 && screenWidth <= 1023 && <>
            <Reveal
              initialLoad={props.initialLoad}
              switchPage={props.switchPage}
              height='1.4rem'
            >
              <div className="technologies bot-row-text">
                <br />
                <div>TypeScript</div>
                <br />
                <div>Next JS</div>
                <br />
                <div>Express</div>
                <br />
              </div>
            </Reveal>
          </>}
          {screenWidth >= 1024 && <>
            <Reveal
              initialLoad={props.initialLoad}
              switchPage={props.switchPage}
              height='1.6rem'
            >
              <div className="technologies bot-row-text">
                <br />
                <div>TypeScript</div>
                <br />
                <div>Next JS</div>
                <br />
                <div>Express</div>
                <br />
              </div>
            </Reveal>
          </>}

          <div
            className="contact"
          >

            {screenWidth <= 480 && <>
              <h3>
                <Reveal
                  initialLoad={props.initialLoad}
                  switchPage={props.switchPage}
                  height={'2.2rem'}
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
                    height="1.2rem"
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
                    height="1.2rem"
                  >
                    <Link
                      to="https://www.instagram.com/lucas.shen21/"
                      target="_blank"
                      draggable='false'
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
                    height="1.2rem"
                  >
                    <Link
                      to="https://github.com/jiayishen21"
                      target="_blank"
                      draggable='false'
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
                    height="1.2rem"
                  >
                    <Link
                      to="https://www.linkedin.com/in/lucas-shen-8b5035209/"
                      target="_blank"
                      draggable='false'
                    >
                      LinkedIn
                      <span>
                        <div className="full-contact">
                          Lucas Shen
                        </div>
                      </span>
                    </Link>

                  </Reveal>
                </li>
              </ul>
            </>}

            {screenWidth > 480 && screenWidth <= 767 && <>
              <h3>
                <Reveal
                  initialLoad={props.initialLoad}
                  switchPage={props.switchPage}
                  height={'3rem'}
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
                    height="1.5rem"
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
                    height="1.5rem"
                  >
                    <Link
                      to="https://www.instagram.com/lucas.shen21/"
                      target="_blank"
                      draggable='false'
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
                    height="1.5rem"
                  >
                    <Link
                      to="https://github.com/jiayishen21"
                      target="_blank"
                      draggable='false'
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
                    height="1.5rem"
                  >
                    <Link
                      to="https://www.linkedin.com/in/lucas-shen-8b5035209/"
                      target="_blank"
                      draggable='false'
                    >
                      LinkedIn
                      <span>
                        <div className="full-contact">
                          Lucas Shen
                        </div>
                      </span>
                    </Link>

                  </Reveal>
                </li>
              </ul>
            </>}
            {screenWidth > 767 && screenWidth <= 1023 && <>
              <h3>
                <Reveal
                  initialLoad={props.initialLoad}
                  switchPage={props.switchPage}
                  height={'4rem'}
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
                      draggable='false'
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
                      draggable='false'
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
                      to="https://www.linkedin.com/in/lucas-shen-8b5035209/"
                      target="_blank"
                      draggable='false'
                    >
                      LinkedIn
                      <span>
                        <div className="full-contact">
                          Lucas Shen
                        </div>
                      </span>
                    </Link>

                  </Reveal>
                </li>
              </ul>
            </>}
            {screenWidth >= 1024 && <>
              <h3>
                <Reveal
                  initialLoad={props.initialLoad}
                  switchPage={props.switchPage}
                  height={'4.3rem'}
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
                    height="2.2rem"
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
                    height="2.2rem"
                  >
                    <Link
                      to="https://www.instagram.com/lucas.shen21/"
                      target="_blank"
                      draggable='false'
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
                    height="2.2rem"
                  >
                    <Link
                      to="https://github.com/jiayishen21"
                      target="_blank"
                      draggable='false'
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
                    height="2.2rem"
                  >
                    <Link
                      to="https://www.linkedin.com/in/lucas-shen-8b5035209/"
                      target="_blank"
                      draggable='false'
                    >
                      LinkedIn
                      <span>
                        <div className="full-contact">
                          Lucas Shen
                        </div>
                      </span>
                    </Link>

                  </Reveal>
                </li>
              </ul>
            </>}
          </div>
          <div className="acknowledgements">
            {screenWidth <= 480 && <>
              <h3>
                <Reveal
                  initialLoad={props.initialLoad}
                  switchPage={props.switchPage}
                  height={'2.2rem'}
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
                    height={'1.5rem'}
                  >
                    <>
                      {'Inspired by '}
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={'1.5rem'}
                  >
                    <>
                      <Link
                        to='https://camillemormal.com/'
                        target="_blank"
                        draggable='false'
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
                    height={'1.5rem'}
                  >
                    <>
                      Built by Lucas Shen using React
                    </>
                  </Reveal>
                </li>
              </ul>
            </>}
            {screenWidth > 480 && screenWidth <= 767 && <>
              <h3>
                <Reveal
                  initialLoad={props.initialLoad}
                  switchPage={props.switchPage}
                  height={'3rem'}
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
                    height={'1.2rem'}
                  >
                    <>
                      {'Inspired by '}
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={'1.2rem'}
                  >
                    <>
                      <Link
                        to='https://camillemormal.com/'
                        target="_blank"
                        draggable='false'
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
                    height={'1.2rem'}
                  >
                    <>
                      Built by Lucas Shen using
                    </>
                  </Reveal>
                  <Reveal
                    initialLoad={props.initialLoad}
                    switchPage={props.switchPage}
                    height={'1.2rem'}
                  >
                    <>
                      React
                    </>
                  </Reveal>
                </li>
              </ul>
            </>}
            {screenWidth > 767 && screenWidth <= 1023 && <>
              <h3>
                <Reveal
                  initialLoad={props.initialLoad}
                  switchPage={props.switchPage}
                  height={'4rem'}
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
                    height={'2rem'}
                  >
                    <>
                      {'Inspired by '}
                      <Link
                        to='https://camillemormal.com/'
                        target="_blank"
                        draggable='false'
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
                    height={'2rem'}
                  >
                    <>
                      Built by Lucas Shen using React
                    </>
                  </Reveal>
                </li>
              </ul>
            </>}
            {screenWidth >= 1024 && <>
              <h3>
                <Reveal
                  initialLoad={props.initialLoad}
                  switchPage={props.switchPage}
                  height={'4.3rem'}
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
                    height={'2.2rem'}
                  >
                    <>
                      {'Inspired by '}
                      <Link
                        to='https://camillemormal.com/'
                        target="_blank"
                        draggable='false'
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
                    height={'2.2rem'}
                  >
                    <>
                      Built by Lucas Shen using React
                    </>
                  </Reveal>
                </li>
              </ul>
            </>}
          </div>
        </div>
      </motion.div >
    </>
  )
}

export default About
