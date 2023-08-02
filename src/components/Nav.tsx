import React from "react"
import { Link, useLocation } from "react-router-dom"

const Nav: React.FC = () => {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <>
      <nav>
        <Link
          to='/'
          className={pathname === '/' ? 'active' : ''}
        >
          Projects
        </Link>
        <Link
          to='/about'
          className={pathname === '/about' ? 'active' : ''}
        >
          About
        </Link>
      </nav> 
    </>
  )
}

export default Nav
