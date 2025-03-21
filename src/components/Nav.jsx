import React from 'react'
import Logout from "./Logout"
import { Link } from "react-router-dom"
import { useUserValue } from '../hooks'

const Nav = () => {
    const user = useUserValue();

    const padding = {
        padding: 6
      }

      const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 36,
      }

  return user && (
    <div style={navStyle}>
        <div>
            <Link style={padding} to="/">Home</Link>
            <Link style={padding} to="/Users">Users</Link>
        </div>
        <Logout />
    </div>
  )
}

export default Nav