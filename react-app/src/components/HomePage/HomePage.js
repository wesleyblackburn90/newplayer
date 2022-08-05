import React from "react";
import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <>
      <div>
        <h1>Welcome to New Player!</h1>
        <NavLink to="/sessions">Start looking for a game</NavLink>
      </div>
    </>
  )
}

export default HomePage
