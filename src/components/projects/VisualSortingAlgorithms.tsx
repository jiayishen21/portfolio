import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

interface Props {
	switchPage: number
	setSwitchPage: React.Dispatch<React.SetStateAction<number>>

	page: string
	setPage: React.Dispatch<React.SetStateAction<string>>
}

const Nav: React.FC<Props> = (props: Props) => {

	return (
		<>
		</>
	)
}

export default Nav
