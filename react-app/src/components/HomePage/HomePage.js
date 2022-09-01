import React from "react";
import { NavLink } from "react-router-dom";
import SessionsBar from "./SessionsBar";
import "./HomePage.css"
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";

function HomePage() {
  const sessions = useSelector(state => state.gameSession)

  return (
    <>
      <div id='splash-page-banner'>
        <div id='inner-splash-div'>
          <h1 id="welcome-div">Welcome to New Player!</h1>
          {/* <div>
            <NavLink id='looking-for-game-nav' to="/sessions">Start looking for a game</NavLink>
          </div> */}
        </div>
      </div>
      <SessionsBar />
    </>
  )
}

export default HomePage
