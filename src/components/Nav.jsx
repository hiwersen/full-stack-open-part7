import React from 'react'
import Logout from "./Logout"
import { Link } from "react-router-dom"

const Nav = () => {
    const padding = {
        padding: 6
      }

      const navStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 36,
      }

  return (
    <div style={navStyle}>
        <div>
            <Link style={padding} to="/">Home</Link>
            <Link style={padding} to="/users">Users</Link>
        </div>
        <Logout />
    </div>
  )
}

export default Nav