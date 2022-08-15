import React, { useState } from "react";
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { getSessionsThunk } from "../../store/gameSession";
import "./Sessions.css"

function Sessions() {
  const dispatch = useDispatch()
  const sessionList = useSelector((state) => Object.values(state.gameSession))

  useEffect(() => {
    dispatch(getSessionsThunk())
  }, dispatch)

  return (
    <>
      <h1>Look for a session</h1>
      <div id="sessions-main-div">
        {sessionList?.map(({ id, location_name, address, city, state, zip_code, game, description, pic_url, players_num }) => (
          <div key={id} className='sessions-main-div-cards'>
            <img className="sessions-main-div-img" src={`${pic_url}`} onError='this.onError=null;this.src="/static/boardgame.jpg"' />
            <p>{location_name} at {city}, {state}</p>
            <p>Game: {game}</p>
            <p>Number of players needed: {players_num}</p>
            <NavLink to={`/sessions/${id}`} >Click for more details...</NavLink>
          </div>
        ))}
      </div>
    </>
  )
}

export default Sessions
