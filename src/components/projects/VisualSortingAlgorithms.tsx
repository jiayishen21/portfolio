import React, { useEffect, useState, useRef } from "react"
import { motion } from 'framer-motion'
import { Link } from "react-router-dom"
import Reveal from "../Reveal"
import ImgReveal from "../ImgReveal"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from "@fortawesome/free-solid-svg-icons"

interface Props {
	switchPage: number
	setSwitchPage: React.Dispatch<React.SetStateAction<number>>

	page: string

	initialLoad: boolean
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
								src={`${process.env.PUBLIC_URL}imgs/project-page-visual-sorting-algorithms.png`}
								alt='visual sorting picture'
								draggable='false'
							/>
						</ImgReveal>
						<div className="layout1-text">
							<div className="para-spacer">
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
								<button className="built-with">
									<Reveal
										initialLoad={props.initialLoad}
										switchPage={props.switchPage}
										height='2rem'
									>
										<>
											Built with React
											<FontAwesomeIcon icon={faArrowDown} />
										</>
									</Reveal>
								</button>
							</div>
						</div>

					</div>
				</div>
			</motion.div>
		</>
	)
}

export default VisualSortingAlgorithms
