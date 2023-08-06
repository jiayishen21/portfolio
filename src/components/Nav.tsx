import React, { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

interface Props {
  switchPage: number
  setSwitchPage: React.Dispatch<React.SetStateAction<number>>

  page: string
  setPage: React.Dispatch<React.SetStateAction<string>>
}

const Nav: React.FC<Props> = (props: Props) => {
  const location = useLocation()
  const pathname = location.pathname

  const navigate = useNavigate()

  const redirect = (page: string) => {
    if(props.switchPage === 0) {
      props.setSwitchPage(700)
      props.setPage(page)
      /*
      const timeoutId = setTimeout(() => navigate(page), 100)

      return () => clearTimeout(timeoutId)
      */
    }
  }

  useEffect(() => {
      const timeoutId = setTimeout(() => navigate(props.page), 100)

      return () => clearTimeout(timeoutId)
  }, [props.page])

  return (
    <>
      <nav>
        <button
          onClick={() => redirect('/')}
          className={pathname === '/' ? 'active' : ''}
        >
          Projects
        </button>
        <button
          onClick={() => redirect('/about')}
          className={pathname === '/about' ? 'active' : ''}
        >
          About
        </button>
      </nav> 
    </>
  )
}

export default Nav
