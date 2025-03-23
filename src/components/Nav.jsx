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
        padding: 16,
        boxShadow: "0 8px 12px #d1d1d1",
        fontWeight: "bold",
      }

  return (
    <nav style={navStyle}>
        <ul>
          <li>
            <Link style={padding} to="/">Home</Link>
          </li>
          <li>
            <Link style={padding} to="/users">Users</Link>
          </li>
        </ul>
        <Logout />
    </nav>
  )
}

export default Nav