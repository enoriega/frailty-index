import React from "react-dom"
import { NavLink, Outlet } from "react-router-dom"
import "./App.css"

function  isActiveNavLink({  isActive }) {
  return {
    textDecoration: isActive?"underline":"none",
    fontWeight: isActive?"bold":"normal"
  }
}

export default function App() {
  return (
	<div>
    <div className="header">
      <h1>Explore Frailty Literature</h1>
      <nav>
          <NavLink to="/overview" style={isActiveNavLink}>Interactions Overview</NavLink> |{" "}
          <NavLink to="/viz" style={isActiveNavLink}>Network View</NavLink> | {" "}
          <NavLink to="/evidence-index" style={isActiveNavLink}>Search Evidence</NavLink>
        </nav>
    </div>
	  <br />
    <div className="content">
      <Outlet />
    </div>
	</div>
  )
}