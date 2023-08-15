
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

const PassionFruitYouth: React.FC<Props> = (props: Props) => {
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
		props.setOnMenu(false)
		props.setCurProject(0)
		props.setSwitchPage(700)
		props.setPage('/')
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
				onMouseDown={handleMouseDown}
				onTouchStart={handleTouchStart}
				onWheel={handleMouseWheel}
				className={`project-page no-scroll ${props.initialLoad ? 'transparent' : ''}`}

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
					{
						// @media only screen and (min-width: 481px) and (max-width: 767px) {
					}
					<div
						className={screenWidth > 767 ? 'layout2' : 'layout1'}
						style={
							screenWidth > 767 ? {
								backgroundImage: `url(${process.env.PUBLIC_URL}/imgs/passionfruit-youth/main.png`,
							} : {}
						}
					>
						{screenWidth < 768 &&
							<ImgReveal
								initialLoad={props.initialLoad}
								switchPage={props.switchPage}
							>
								<img
									src={`${process.env.PUBLIC_URL}imgs/passionfruit-youth/main.png`}
									alt='happy child and parent learning'
									draggable='false'
								/>
							</ImgReveal>
						}

						<div className="layout-text">
							{(screenWidth < 768 && screenWidth > 480) ?
								<>
									<Link
										to='https://jiayishen21.github.io/sorting-algorithms/'
										target="_blank"
										draggable="false"
									>
										<Reveal
											initialLoad={props.initialLoad}
											switchPage={props.switchPage}
											height='4rem'
										>
											<h1>
												PassionFruit Youth
												<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
											</h1>
										</Reveal>
									</Link>
								</> : <>
									<Link
										to='https://jiayishen21.github.io/sorting-algorithms/'
										target="_blank"
										draggable="false"
									>
										<Reveal
											initialLoad={props.initialLoad}
											switchPage={props.switchPage}
											height='4rem'
										>
											<h1>
												PassionFruit
											</h1>
										</Reveal>
										<Reveal
											initialLoad={props.initialLoad}
											switchPage={props.switchPage}
											height='4rem'
										>
											<h1>
												Youth
												<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
											</h1>
										</Reveal>
									</Link>
								</>
							}
							<div className="role-title">
								<Reveal
									initialLoad={props.initialLoad}
									switchPage={props.switchPage}
									height='2rem'
								>
									<>
										Sole Frontend Developer
									</>
								</Reveal>
							</div>
							<div className="role-description">
								<Reveal
									initialLoad={props.initialLoad}
									switchPage={props.switchPage}
									height='1.6rem'
								>
									<>
										PassionFruit Youth is a non-profit that helps
									</>
								</Reveal>
								<Reveal
									initialLoad={props.initialLoad}
									switchPage={props.switchPage}
									height='1.6rem'
								>
									<>
										youth grasp the intricacies of various
									</>
								</Reveal>
								<Reveal
									initialLoad={props.initialLoad}
									switchPage={props.switchPage}
									height='1.6rem'
								>
									<>
										careers, enabling them to make informed
									</>
								</Reveal>
								<Reveal
									initialLoad={props.initialLoad}
									switchPage={props.switchPage}
									height='1.6rem'
								>
									<>
										career decisions.
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
									height='2.3rem'
								>
									<>
										Built with HTML + CSS
										<FontAwesomeIcon icon={faArrowDown} />
									</>
								</Reveal>
							</button>
						</div>
					</div>

					<div className="reflections">
						<div>
							<Reveal
								initialLoad={props.initialLoad}
								switchPage={props.switchPage}
								height='4rem'
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
										height='2rem'
									>
										<>
											Had to find ways to make a landing
										</>
									</Reveal>
									<Reveal
										initialLoad={props.initialLoad}
										switchPage={props.switchPage}
										height='2rem'
									>
										<>
											page interactive.
										</>
									</Reveal>
								</li>
								<li>
									<Reveal
										initialLoad={props.initialLoad}
										switchPage={props.switchPage}
										height='2rem'
									>
										<>
											Handling responsive design purely with
										</>
									</Reveal>
									<Reveal
										initialLoad={props.initialLoad}
										switchPage={props.switchPage}
										height='2rem'
									>
										<>
											CSS media queries.
										</>
									</Reveal>
								</li>
								<li>
									<Reveal
										initialLoad={props.initialLoad}
										switchPage={props.switchPage}
										height='2rem'
									>
										<>
											Search engine optimization without
										</>
									</Reveal>
									<Reveal
										initialLoad={props.initialLoad}
										switchPage={props.switchPage}
										height='2rem'
									>
										<>
											dynamic content and changing meta
										</>
									</Reveal>
									<Reveal
										initialLoad={props.initialLoad}
										switchPage={props.switchPage}
										height='2rem'
									>
										<>
											tags.
										</>
									</Reveal>
								</li>
							</ul>
						</div>

						<div>
							<Reveal
								initialLoad={props.initialLoad}
								switchPage={props.switchPage}
								height='4rem'
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
										height='2rem'
									>
										<>
											Meta tag for search engine optimization
										</>
									</Reveal>
									<Reveal
										initialLoad={props.initialLoad}
										switchPage={props.switchPage}
										height='2rem'
									>
										<>
											in HTML.
										</>
									</Reveal>
								</li>
								<li>
									<Reveal
										initialLoad={props.initialLoad}
										switchPage={props.switchPage}
										height='2rem'
									>
										<>
											Using unique CSS animations that
										</>
									</Reveal>
									<Reveal
										initialLoad={props.initialLoad}
										switchPage={props.switchPage}
										height='2rem'
									>
										<>
											trigger on hover to create interactivity.
										</>
									</Reveal>
								</li>
								<li>
									<Reveal
										initialLoad={props.initialLoad}
										switchPage={props.switchPage}
										height='2rem'
									>
										<>
											Animating numbers with the @property
										</>
									</Reveal>
									<Reveal
										initialLoad={props.initialLoad}
										switchPage={props.switchPage}
										height='2rem'
									>
										<>
											CSS rule
										</>
									</Reveal>
								</li>
								<li>
									<Reveal
										initialLoad={props.initialLoad}
										switchPage={props.switchPage}
										height='2rem'
									>
										<>
											Deploying a HTML project to GitHub
										</>
									</Reveal>
									<Reveal
										initialLoad={props.initialLoad}
										switchPage={props.switchPage}
										height='2rem'
									>
										<>
											Pages and configuring a custom
										</>
									</Reveal>
									<Reveal
										initialLoad={props.initialLoad}
										switchPage={props.switchPage}
										height='2rem'
									>
										<>
											domain.
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
									src={`${process.env.PUBLIC_URL}imgs/passionfruit-youth/0.png`}
									alt='home page'
									draggable='false'
								/>
							</ImgReveal>
							<ImgReveal
								initialLoad={props.initialLoad}
								switchPage={props.switchPage}
							>
								<img
									src={`${process.env.PUBLIC_URL}imgs/passionfruit-youth/1.png`}
									alt='impact'
									draggable='false'
								/>
							</ImgReveal>
							<ImgReveal
								initialLoad={props.initialLoad}
								switchPage={props.switchPage}
							>
								<img
									src={`${process.env.PUBLIC_URL}imgs/passionfruit-youth/2.png`}
									alt='events'
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
									src={`${process.env.PUBLIC_URL}imgs/passionfruit-youth/next-project.png`}
									alt='visual sorting algorithms'
									draggable='false'
								/>
							</ImgReveal>

							<div className="text-centering">
								<Reveal
									initialLoad={props.initialLoad}
									switchPage={props.switchPage}
									height='4rem'
								>
									<h2>
										Visual Sorting Algorithms
									</h2>
								</Reveal>
								<div
									className="reveal-container"
									style={{ height: '2.3rem' }}
								>
									<h4>
										Next Project
									</h4>
								</div>
							</div>
						</button>

					</div>

				</div>
			</motion.div>
		</>
	)
}

export default PassionFruitYouth
