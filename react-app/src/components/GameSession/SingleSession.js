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
import defaultImg from '../defaultImg/boardgame.jpg'
import MapPageA from "../GoogleMap/MapPageA";
import DeleteConfirmModal from "./DeleteConfirmModal";

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
  const [errorImg, setErrorImg] = useState(true)
  const [currentPosition, setCurrentPosition] = useState({ lat: 43.11016617798622, lng: -89.48826131670266 })

  let newArr = []
  if (sessionPlayers && allUsers) {
    sessionPlayers.map((player) => {
      return Object.values(allUsers).forEach((user) => {
        if (player.user_id === user.id) {
          newArr.push(user)
        }
      })
    })
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
    await dispatch(deleteSessionThunk(sessionId)).then(window.alert("Session successfully deleted")).then(history.push('/'))
  }

  function imgErrorHandler(e) {
    if (errorImg) {
      setErrorImg(false)
    }
    e.target.src = defaultImg
  }

  let locationAddress
  if (session) {
    locationAddress = session.address + " " + session.city + " " + session.state
  }

  // let sessionDate = session.date_time
  // if (session.date_time) {
  //   sessionDate = session.date_time.toISOString().slice(0, 10) + " " + session.date_time.toISOString().slice(11, 19)
  // }

  return (
    <div id="single-session-container">
      {session && host &&
        <div id="whole-single-session-div">
          <img id="profile-background-img" src={session.pic_url} onError={imgErrorHandler}></img>
          <div id="main-single-session-div">
            <div id='single-session-div-top'>
              <img id='single-session-img' src={`${session.pic_url}`} onError={imgErrorHandler} />
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
                      <DeleteConfirmModal sessions={session} />
                    </>
                  }
                </div>
              </div>
            </div>
            <div id="single-session-div-bottom">
              <div id="single-session-div-bottom-left">
                <p id="description" style={{ "margin": "20px" }}>Description: {session.description}</p>
                <p style={{ "margin": "20px" }}>Number of players needed: {session.players_num - sessionPlayers.length}</p>
                <div id="players-list-div">
                  <p style={{ "text-decoration": "underline" }}>Players joined</p>
                  {newArr && newArr.length ?
                    <div>
                      {newArr && newArr.map((player) => {
                        return <NavLink to={`/users/${player.id}`}>{player.username}</NavLink>
                      })}
                    </div>
                    : <p>No players yet</p>
                  }
                </div>
              </div>
              <div id="single-session-div-bottom-right">
                <div style={{ display: "flex", flexDirection: "row" }} id="location-div">
                  <img id="location-icon" src='/static/location.png' />
                  <div id='location-info-div'>
                    <h2 style={{ "font-weight": "bold" }}>Location</h2>
                    <p className="location-info">{session.location_name}</p>
                    <p className="location-info">{session.address}</p>
                    <p className="location-info">{session.city}, {session.state} {session.zip_code}</p>
                  </div>
                </div>
                <div>
                  <h2>Session Date</h2>
                  <p>{session.date_time?.slice(0, 16)}</p>
                </div>
                <MapPageA locationAddress={locationAddress} />
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default SingleSession
