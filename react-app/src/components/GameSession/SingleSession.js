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
import { getAllUsers } from "../../store/user";

function SingleSession() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { sessionId } = useParams()
  const session = useSelector((state) => (state.gameSession[sessionId]))
  const userId = useSelector((state) => (state.session.user.id))
  const players = useSelector((state) => (state.players))
  const allUsers = useSelector((state) => (state.user))
  const sessionPlayers = Object.values(players).filter((player) => player.session_id === parseInt(sessionId))
  const alreadyJoined = Object.values(sessionPlayers).filter((player) => player.user_id === parseInt(userId))

  const [users, setUsers] = useState([])
  let newArr = []
  if (sessionPlayers && allUsers) {
    sessionPlayers.map((player) => {
      return Object.values(allUsers).forEach((user) => {
        if (player.user_id === user.id) {
          newArr.push(user)
        }
      })
    })
    console.log(newArr)
  }

  useEffect(() => {
    dispatch(getSessionsThunk())
    dispatch(getAllPlayers())
    dispatch(getAllUsers())
    if (!userId) {
      history.push('/login')
    }
  }, [dispatch])

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
    <div id="single-session-container">
      {session && host &&
        <div id="whole-single-session-div">
          <img id="profile-background-img" src={session.pic_url} onError='this.onError=null;this.src="/static/boardgame.jpg"'></img>
          <div id="main-single-session-div">
            <div id='single-session-div-top'>
              <img id='single-session-img' src={`${session.pic_url}`} onError='this.onError=null;this.src="/static/boardgame.jpg"' />
              <div id='single-session-div-top-right'>
                <div id='top-right-info'>
                  <p>{session.game}</p>
                  <p>Host: <NavLink style={{ "text-decoration": "none" }} to={`/users/${host.id}`}>{host.username}</NavLink></p>
                  {host.id !== userId ?
                    <div>
                      {host &&
                        <div id="join-message">
                          {alreadyJoined.length > 0 ?
                            <p>You've joined this session!</p>
                            :
                            sessionPlayers && sessionPlayers.length === session.players_num ?
                              <p>This session has reached its max number of players</p>
                              :
                              <button id='join-now-btn' className="button" onClick={handleJoin}>Join now!</button>}
                        </div>
                      }
                    </div>
                    : <>
                      {newArr.length === session.players_num ?
                        <p>Cannot edit after player list is full!</p>
                        :
                        <EditSessionFormModal session={session} />
                      }
                      <button className="button" onClick={handleDelete}>Delete session</button>
                    </>
                  }
                </div>
              </div>
            </div>
            <div id="single-session-div-bottom">
              <div id="single-session-div-bottom-left">
                <p id="description" style={{ "margin": "20px" }}>Description: {session.description}</p>
                <p>Number of players needed: {session.players_num}</p>
                <div id="players-list-div">
                  <p style={{ "text-decoration": "underline" }}>Players joined</p>
                  {newArr && newArr.length ?
                    <div>
                      {newArr && newArr.map((player) => {
                        return <p>{player.username}</p>
                      })}
                    </div>
                    : <p>No players yet</p>
                  }
                </div>
              </div>
              <div id="single-session-div-bottom-right">
                <img id="location-icon" src='/static/location.png' />
                <div id='location-info-div'>
                  <h2 style={{ "font-weight": "bold" }}>Location</h2>
                  <p className="location-info">{session.location_name}</p>
                  <p className="location-info">{session.address}</p>
                  <p className="location-info">{session.city}, {session.state} {session.zip_code}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default SingleSession
