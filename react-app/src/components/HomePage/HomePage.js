import React from "react";
import { NavLink } from "react-router-dom";
import SessionsBar from "./SessionsBar";

function HomePage() {
  return (
    <>
      <div>
        <h1 id="welcome-div">Welcome to New Player!</h1>
        <NavLink to="/sessions">Start looking for a game</NavLink>
      </div>
      <SessionsBar />
    </>
  )
}

export default HomePage
