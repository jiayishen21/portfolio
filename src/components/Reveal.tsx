import React, { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from 'framer-motion'

interface Props {
	children: JSX.Element,
	height: string,
	initialLoad: boolean,
	switchPage: number,
}

const Reveal: React.FC<Props> = (props: Props) => {
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
				className="reveal-container"
				style={{ height: props.height }}
			>
				<motion.div
					variants={{
						hidden: { y: '150%' },
						visible: { y: 0 },
					}}
					transition={{ duration: 0.8, delay: props.initialLoad || props.switchPage ? 1.3 : 0.2 }}
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

export default Reveal

