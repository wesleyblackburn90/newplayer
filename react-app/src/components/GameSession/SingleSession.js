import React, { useState } from "react";
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getSessionsThunk, deleteSessionThunk } from "../../store/gameSession";
import EditSessionFormModal from "./EditSessionFormModal"
import EditSessionForm from "./EditSessionForm";
import UsersProfile from "../Profiles/UsersProfile";
import { addNewPlayer, getAllPlayers } from "../../store/players";
import "./SingleSession.css"

function SingleSession() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { sessionId } = useParams()
  const session = useSelector((state) => (state.gameSession[sessionId]))
  const userId = useSelector((state) => (state.session.user.id))
  const players = useSelector((state) => (state.players))
  const sessionPlayers = Object.values(players).filter((player) => player.session_id === parseInt(sessionId))


  const [users, setUsers] = useState([])

  useEffect(() => {
    dispatch(getSessionsThunk())
    dispatch(getAllPlayers())
  }, dispatch)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/users/')
      const resData = await res.json()
      setUsers(resData.users)
    }
    fetchData()
  }, [])

  let host;
  if (session && users) {
    host = users.filter(user => user.id === session.organizer_id)[0]
  }

  const handleJoin = async (e) => {
    e.preventDefault()

    const player = {
      session_id: sessionId,
      user_id: userId
    }

    try {
      const newPlayer = await dispatch(addNewPlayer(player))

      if (newPlayer) {
        window.alert("You have scheduled to join this session!")
      }
    } catch (error) {
      throw error
    }
  }

  const handleDelete = async () => {
    await dispatch(deleteSessionThunk(sessionId)).then(history.push('/sessions'))
  }

  return (
    <div>
      {session && host &&
        <div id="whole-single-session-div">
          <div id="main-single-session-div">
            <div id='single-session-div-top'>
              <img id='single-session-img' src={`${session.pic_url}`} />
              <div id='single-session-div-top-right'>
                <p>Game: {session.game}</p>
                <p>Hosted by: {host.username}</p>
                <button id='join-now-btn' className="button" onClick={handleJoin}>Join now!</button>
              </div>
            </div>
            <p>Location Name: {session.location_name}</p>
            {/* {session && session.organizer_id === } */}
            <p>Address: {session.address}</p>
            <p>City: {session.city}</p>
            <p>State: {session.state}</p>
            <p>Zipcode: {session.zip_code}</p>
            <p>Description: {session.description}</p>
            <p>Number of players needed: {session.players_num}</p>
            <p>Number of players joined: {sessionPlayers.length}</p>
          </div>
        </div>
      }
      {session && userId === session.organizer_id ?
        <>
          <EditSessionFormModal session={session} />
          <button className="button" onClick={handleDelete}>Delete session</button>
        </>
        :
        <div>
          {host &&
            <NavLink to={`/users/${host.id}`}>View {host.username}'s Profile</NavLink>
          }
          {/* <UsersProfile user={host} /> */}
        </div>
      }
    </div>
  )
}

export default SingleSession
