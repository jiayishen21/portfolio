import React, { useEffect, useState, useRef } from "react"
import { motion } from 'framer-motion'
import Reveal from "./Reveal"
import ImgReveal from "./ImgReveal"
import projects from "../projects"

interface Props {
	switchPage: number
	setSwitchPage: React.Dispatch<React.SetStateAction<number>>

	initialLoad: boolean

	page: string
	setPage: React.Dispatch<React.SetStateAction<string>>
}

const MobileProjects: React.FC<Props> = (props: Props) => {

	// Navigation
	const redirect = (page: string) => {
		if (props.switchPage === 0 && props.page !== page) {
			props.setSwitchPage(1400)
			props.setPage(page)
		}
	}

	return (
		<>
			<motion.div
				className={`no-scroll ${props.initialLoad ? 'transparent' : ''}`}

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
					className="content mobile-projects"
				>
					{
						projects.map((project) => (
							<div
								className="mobile-project"
								key={project.name}
							>
								<ImgReveal
									initialLoad={props.initialLoad}
									switchPage={props.switchPage}
								>
									<img
										src={`${process.env.PUBLIC_URL}${project.menuImgPath}`}
										alt={project.name}
										draggable='false'
										onClick={() => redirect(project.link)}
									/>
								</ImgReveal>
								<Reveal
									initialLoad={props.initialLoad}
									switchPage={props.switchPage}
									height="min(calc(6vw + 0.5rem), 2rem)"
								>
									<h2
										onClick={() => redirect(project.link)}
									>
										{project.name}
									</h2>
								</Reveal>
								<Reveal
									initialLoad={props.initialLoad}
									switchPage={props.switchPage}
									height="min(calc(6vw + 0.5rem), 2rem)"
								>
									<h4
										onClick={() => redirect(project.link)}
									>
										Explore
									</h4>
								</Reveal>
							</div>
						))
					}
				</div>
			</motion.div>
		</>
	)
}

export default MobileProjects

