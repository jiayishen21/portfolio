import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

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
    if(props.switchPage === 0 && props.page !== page) {
      if(page === '/') {
        props.setSwitchPage(700)
      }
      else if(page === '/about') {
        props.setSwitchPage(1400)
      }
      props.setPage(page)
    }
  }

  const [initialLoad, setInitialLoad] = useState<boolean>(true)

  useEffect(() => {
    if(initialLoad) {
      setInitialLoad(false)
      props.setPage(location.pathname)
      return
    }
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
