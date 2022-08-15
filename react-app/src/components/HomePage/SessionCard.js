import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { getSessionsThunk } from "../../store/gameSession"
import { getAllPlayers } from "../../store/players"
import "./SessionCard.css"

function SessionCard({ session }) {
  const dispatch = useDispatch()
  const players = useSelector((state) => (state.players))
  const sessionPlayers = Object.values(players).filter((player) => player.session_id === session.id)

  useEffect(() => {
    dispatch(getAllPlayers())
  }, dispatch)


  return (
    <>
      <div id='session-card-div'>
        <NavLink className='session-card' to={`/sessions/${session.id}`}>
          <img className='session-card-img' src={`${session.pic_url}`} onError='this.onError=null;this.src="/static/boardgame.jpg"' />
          <h3>Now playing</h3>
          <p>{session.game}</p>
          <p>Playing at {session.location_name}</p>
          {sessionPlayers.length < session.players_num ?
            <p> Needs {session.players_num - sessionPlayers.length} more players!</p>
            :
            <p> This session is full! </p>
          }
          <p>Click for more details...</p>
        </NavLink>
      </div>
    </>
  )
}

export default SessionCard
