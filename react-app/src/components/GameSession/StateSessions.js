import React, { useState } from "react";
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from "react-router-dom";
import { getSessionsThunk } from "../../store/gameSession";
import "./Sessions.css"

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
  const [statesArr, setStatesArr] = useState([])


  // useEffect(() => {
  //   const getSessions = async () => {
  //     const res = await fetch('/api/sessions')
  //     console.log(res)
  //     const data = await res.json()
  //     console.log(data)
  //     const stateName = Object.values(data.state)
  //     console.log(stateName)
  //     const newArr = Object.values(sessionList).filter((currentState) => currentState.state === stateName)
  //     setStatesArr(newArr)
  //   }
  //   getSessions()
  // }, [])

  useEffect(() => {
    dispatch(getSessionsThunk())
  }, dispatch)

  return (
    <>
      {/* {state && */}
      <div>
        <h1>Look for a session in {stateName}</h1>
        <div id="sessions-main-div">
          {newArr?.map(({ id, location_name, address, city, state, zip_code, game, description, pic_url, players_num }) => (
            <div key={id} className='sessions-main-div-cards'>
              <img className="sessions-main-div-img" src={`${pic_url}`} />
              <p>{location_name} at {city}, {state}</p>
              <p>Game: {game}</p>
              <p>Number of players needed: {players_num}</p>
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
