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
          <p>{location_name}</p>
          <p>{address}</p>
          <p>{city}</p>
          <p>{state}</p>
          <p>{zip_code}</p>
          <p>{game}</p>
          <p>{description}</p>
          <img src={`${pic_url}`} />
          <p>{players_num}</p>
        </div>
      ))}
    </>
  )
}

export default Sessions
