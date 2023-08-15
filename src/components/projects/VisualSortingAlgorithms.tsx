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

const VisualSortingAlgorithms: React.FC<Props> = (props: Props) => {
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
		props.setCurProject(1)
		props.setSwitchPage(700)
		props.setPage('/')
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
					<div className="layout1">
						<ImgReveal
							initialLoad={props.initialLoad}
							switchPage={props.switchPage}
						>
							<img
								src={`${process.env.PUBLIC_URL}imgs/visual-sorting-algorithms/main.png`}
								alt='visual sorting picture'
								draggable='false'
							/>
						</ImgReveal>
						<div className="layout-text">
							<div className="para-spacer">
								{screenWidth <= 480 && <>
									<Link
										to='https://jiayishen21.github.io/sorting-algorithms/'
										target="_blank"
										draggable="false"
									>
										<Reveal
											initialLoad={props.initialLoad}
											switchPage={props.switchPage}
											height='calc(10vw + 1rem)'
										>
											<h1>
												Visual Sorting
											</h1>
										</Reveal>
										<Reveal
											initialLoad={props.initialLoad}
											switchPage={props.switchPage}
											height='calc(10vw + 1rem)'
										>
											<h1>
												Algorithms
												<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
											</h1>
										</Reveal>
									</Link>
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
											height='calc((10vw - 0.15rem)/3 + 0.3rem)'
										>
											<>
												Visual Sorting Algorithms is a website that
											</>
										</Reveal>
										<Reveal
											initialLoad={props.initialLoad}
											switchPage={props.switchPage}
											height='calc((10vw - 0.15rem)/3 + 0.3rem)'
										>
											<>
												displays the swaps and comparisons being
											</>
										</Reveal>
										<Reveal
											initialLoad={props.initialLoad}
											switchPage={props.switchPage}
											height='calc((10vw - 0.15rem)/3 + 0.3rem)'
										>
											<>
												made during various sorting algorithms.
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
												Built with React
												<FontAwesomeIcon icon={faArrowDown} />
											</>
										</Reveal>
									</button>
								</>}
								{screenWidth > 480 && screenWidth <= 767 && <>
									<Link
										to='https://jiayishen21.github.io/sorting-algorithms/'
										target="_blank"
										draggable="false"
									>
										<Reveal
											initialLoad={props.initialLoad}
											switchPage={props.switchPage}
											height='calc(6vw)'
										>
											<h1>
												Visual Sorting Algorithms
												<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
											</h1>
										</Reveal>
									</Link>
									<div className="role-title">
										<Reveal
											initialLoad={props.initialLoad}
											switchPage={props.switchPage}
											height='calc(3*(6vw - 0.5rem)/4 + 0.5rem'
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
											height='calc((5.5vw - 0.3rem)/2 + 0.2rem)'
										>
											<>
												Visual Sorting Algorithms is a website that
											</>
										</Reveal>
										<Reveal
											initialLoad={props.initialLoad}
											switchPage={props.switchPage}
											height='calc((5.5vw - 0.3rem)/2 + 0.2rem)'
										>
											<>
												displays the swaps and comparisons being
											</>
										</Reveal>
										<Reveal
											initialLoad={props.initialLoad}
											switchPage={props.switchPage}
											height='calc((5.5vw - 0.3rem)/2 + 0.2rem)'
										>
											<>
												made during various sorting algorithms.
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
											height='calc(3*(6vw - 0.5rem)/4 + 0.5rem'
										>
											<>
												Built with React
												<FontAwesomeIcon icon={faArrowDown} />
											</>
										</Reveal>
									</button>
								</>}
								{screenWidth > 767 && screenWidth <= 1023 && <>
									<Link
										to='https://jiayishen21.github.io/sorting-algorithms/'
										target="_blank"
										draggable="false"
									>
										<Reveal
											initialLoad={props.initialLoad}
											switchPage={props.switchPage}
											height='3.2rem'
										>
											<h1>
												Visual Sorting
											</h1>
										</Reveal>
										<Reveal
											initialLoad={props.initialLoad}
											switchPage={props.switchPage}
											height='3.2rem'
										>
											<h1>
												Algorithms
												<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
											</h1>
										</Reveal>
									</Link>
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
											height='1.45rem'
										>
											<>
												Visual Sorting Algorithms is a website that
											</>
										</Reveal>
										<Reveal
											initialLoad={props.initialLoad}
											switchPage={props.switchPage}
											height='1.45rem'
										>
											<>
												displays the swaps and comparisons being
											</>
										</Reveal>
										<Reveal
											initialLoad={props.initialLoad}
											switchPage={props.switchPage}
											height='1.45rem'
										>
											<>
												made during various sorting algorithms.
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
												Built with React
												<FontAwesomeIcon icon={faArrowDown} />
											</>
										</Reveal>
									</button>
								</>}
								{screenWidth >= 1024 && <>
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
												Visual Sorting
											</h1>
										</Reveal>
										<Reveal
											initialLoad={props.initialLoad}
											switchPage={props.switchPage}
											height='4rem'
										>
											<h1>
												Algorithms
												<FontAwesomeIcon icon={faArrowUpRightFromSquare} />
											</h1>
										</Reveal>
									</Link>
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
												Visual Sorting Algorithms is a website that
											</>
										</Reveal>
										<Reveal
											initialLoad={props.initialLoad}
											switchPage={props.switchPage}
											height='1.6rem'
										>
											<>
												displays the swaps and comparisons being
											</>
										</Reveal>
										<Reveal
											initialLoad={props.initialLoad}
											switchPage={props.switchPage}
											height='1.6rem'
										>
											<>
												made during various sorting algorithms.
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
												Built with React
												<FontAwesomeIcon icon={faArrowDown} />
											</>
										</Reveal>
									</button>
								</>}
							</div>
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
											Could not use loops and recursion
										</>
									</Reveal>
									<Reveal
										initialLoad={props.initialLoad}
										switchPage={props.switchPage}
										height='2rem'
									>
										<>
											when sorting because state variable
										</>
									</Reveal>
									<Reveal
										initialLoad={props.initialLoad}
										switchPage={props.switchPage}
										height='2rem'
									>
										<>
											changes are not detected.
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
											Storing and displaying all variables
										</>
									</Reveal>
									<Reveal
										initialLoad={props.initialLoad}
										switchPage={props.switchPage}
										height='2rem'
									>
										<>
											involved in a recursive process.
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
											Rendering arrays involved in recursive
										</>
									</Reveal>
									<Reveal
										initialLoad={props.initialLoad}
										switchPage={props.switchPage}
										height='2rem'
									>
										<>
											proccesses, which were stored in a
										</>
									</Reveal>
									<Reveal
										initialLoad={props.initialLoad}
										switchPage={props.switchPage}
										height='2rem'
									>
										<>
											unordered binary tree.
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
											Using event listeners.
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
											Using promise and state variables to
										</>
									</Reveal>
									<Reveal
										initialLoad={props.initialLoad}
										switchPage={props.switchPage}
										height='2rem'
									>
										<>
											create a timer that responds to state
										</>
									</Reveal>
									<Reveal
										initialLoad={props.initialLoad}
										switchPage={props.switchPage}
										height='2rem'
									>
										<>
											variable changes.
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
											Version control with GitHub.
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
											Deploying a React app to GitHub Pages.
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
									src={`${process.env.PUBLIC_URL}imgs/visual-sorting-algorithms/0.png`}
									alt='visual sorting picture'
									draggable='false'
								/>
							</ImgReveal>
							<ImgReveal
								initialLoad={props.initialLoad}
								switchPage={props.switchPage}
							>
								<img
									src={`${process.env.PUBLIC_URL}imgs/visual-sorting-algorithms/1.png`}
									alt='visual sorting picture'
									draggable='false'
								/>
							</ImgReveal>
							<ImgReveal
								initialLoad={props.initialLoad}
								switchPage={props.switchPage}
							>
								<img
									src={`${process.env.PUBLIC_URL}imgs/visual-sorting-algorithms/2.png`}
									alt='visual sorting picture'
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
									src={`${process.env.PUBLIC_URL}imgs/visual-sorting-algorithms/next-project.png`}
									alt='passionfruit youth'
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
										PassionFruit Youth
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

export default VisualSortingAlgorithms
