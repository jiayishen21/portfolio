import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

interface Props {
	switchPage: number
	setSwitchPage: React.Dispatch<React.SetStateAction<number>>

	page: string
	setPage: React.Dispatch<React.SetStateAction<string>>
	initialLoad: boolean
}

const ProjectNav: React.FC<Props> = (props: Props) => {
	const redirect = (page: string) => {
		if (props.switchPage === 0 && props.page !== page) {
			if (page === '/') {
				props.setSwitchPage(700)
			}
			else if (page === '/about') {
				props.setSwitchPage(1400)
			}
			props.setPage(page)
		}
	}

	const [initialLoad, setInitialLoad] = useState<boolean>(true)

	useEffect(() => {
		if (initialLoad) {
			setInitialLoad(false)
			return
		}
	}, [])

	return (
		<>
			<nav
				className={`project-nav ${(props.page !== '/' && props.page !== '/about') ? 'front' : ''}`}
			>
				<button
					onClick={() => redirect('/')}
					className={(props.page === '/' || props.page === '/about') || props.switchPage > 0 ? 'up400' : ''}
				>
					Back
				</button>
			</nav>
		</>
	)
}

export default ProjectNav
