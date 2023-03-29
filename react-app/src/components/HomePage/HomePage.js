import React from "react";
import { NavLink } from "react-router-dom";
import SessionsBar from "./SessionsBar";
import "./HomePage.css"
import SearchBar from "../SearchBar/SearchBar";
import { useSelector } from "react-redux";
import MapPageA from "../GoogleMap/MapPageA";

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
      <p id="welcome-statement">Welcome to my app, New Player, where you can create or join table top game sessions! Just search in the top search bar for a game you want to play and join!</p>
      <SessionsBar />
    </>
  )
}

export default HomePage
