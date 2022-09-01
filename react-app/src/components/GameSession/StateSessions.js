import React, { useState } from "react";
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from "react-router-dom";
import { getSessionsThunk } from "../../store/gameSession";
import "./StateSessions.css"

function StateSessions() {
  const dispatch = useDispatch()
  const currentState = useParams()
  const stateName = Object.values(currentState)
  console.log(stateName)
  const sessionList = useSelector((state) => Object.values(state.gameSession))
  console.log(sessionList)
  let newArr
  if (sessionList) {
    newArr = Object.values(sessionList).filter((ele) => ele.state === stateName[0])
    console.log(newArr)
  }


  useEffect(() => {
    dispatch(getSessionsThunk())
  }, dispatch)

  return (
    <>
      {/* {state && */}
      <div>
        <div id='state-session-banner'>
          <h1 id='state-sessions-image'>Find your new gaming spot in {stateName}</h1>
        </div>
        <h1 style={{ "padding": "20px" }}>Look for a session in {stateName}</h1>
        <div className="sessions-main-div">
          {newArr?.map(({ id, location_name, address, city, state, zip_code, game, description, pic_url, players_num }) => (
            <div key={id} className='state-sessions-main-div-cards'>
              <img className="sessions-main-div-img" src={`${pic_url}`} onError='this.onError=null;this.src="/static/boardgame.jpg"' />
              <h3>Location</h3>
              <p>{location_name} at {city}, {state}</p>
              <h3>Game</h3>
              <p>{game}</p>
              <h3>Number of players needed </h3>
              <p>{players_num}</p>
              <NavLink to={`/sessions/${id}`} >Click for more details...</NavLink>
            </div>
          ))}
        </div>
      </div>
      {/* } */}
    </>
  )
}

export default StateSessions
