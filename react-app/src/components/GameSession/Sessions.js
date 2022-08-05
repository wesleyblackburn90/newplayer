import React, { useState } from "react";
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import { getSessionsThunk } from "../../store/gameSession";

function Sessions() {
  const dispatch = useDispatch()
  const sessionList = useSelector((state) => Object.values(state.gameSession))

  useEffect(() => {
    dispatch(getSessionsThunk())
  }, dispatch)

  return (
    <>
      {sessionList?.map(({ id, location_name, address, city, state, zip_code, game, description, pic_url, players_num }) => (
        <div key={id}>
          <p>Location Name: {location_name}</p>
          <p>Address: {address}</p>
          <p>City: {city}</p>
          <p>State: {state}</p>
          <p>Zipcode: {zip_code}</p>
          <p>Game: {game}</p>
          <p>Description: {description}</p>
          <img src={`${pic_url}`} />
          <p>Number of players needed: {players_num}</p>
          <p>Sound like fun?</p>
          <NavLink to={`/sessions/${id}`} >Join now!</NavLink>
        </div>
      ))}
    </>
  )
}

export default Sessions
