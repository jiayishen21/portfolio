import React, { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from 'framer-motion'

interface Props {
	children: JSX.Element,
	initialLoad: boolean,
	switchPage: number,
}

const ImgReveal: React.FC<Props> = (props: Props) => {
	const ref = useRef(null)
	const inView = useInView(ref,
		{
			// Once allows it to fire only the first time
			once: true
		}
	)

	const mainControls = useAnimation()

	useEffect(() => {
		if (inView) {
			mainControls.start('visible')
		}
	}, [inView])

	return (
		<>
			<div
				ref={ref}
			>
				<motion.div
					variants={{
						hidden: { opacity: 0 },
						visible: { opacity: 1 },
					}}
					transition={{
						duration: 0.6,
						delay: props.initialLoad || props.switchPage ? 0.6 : 0.3,
						ease: 'easeOut',
					}}
					initial='hidden'
					animate={
						mainControls
					}
				>
					{props.children}
				</motion.div>
			</div>
		</>
	)
}

export default ImgReveal

