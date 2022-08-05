import React from "react";
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getSessionsThunk, deleteSessionThunk } from "../../store/gameSession";
import EditSessionFormModal from "./EditSessionFormModal"

function SingleSession() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { sessionId } = useParams()
  const session = useSelector((state) => (state.gameSession[sessionId]))
  const userId = useSelector((state) => (state.session.user.id))

  useEffect(() => {
    dispatch(getSessionsThunk())
  }, dispatch)

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(`/api/sessions/${sessionId}`)
  //     const session = await response.json()
  //     getSessionsThunk()
  //   })
  // })

  // const { organizer_id, location_name, address, city, state, zip_code, game, description, pic_url, players_num } = session

  const handleDelete = async () => {
    console.log("hello")
    await dispatch(deleteSessionThunk(sessionId)).then(history.push('/sessions'))
  }


  return (
    <div>
      {session &&
        <div>
          <p>Location Name: {session.location_name}</p>
          <p>Address: {session.address}</p>
          <p>City: {session.city}</p>
          <p>State: {session.state}</p>
          <p>Zipcode: {session.zip_code}</p>
          <p>Game: {session.game}</p>
          <p>Description: {session.description}</p>
          <img src={`${session.pic_url}`} />
          <p>Number of players needed: {session.players_num}</p>
        </div>
      }
      {userId === session.organizer_id ?
        <>
          <EditSessionFormModal session={session} />
          <button onClick={handleDelete}>Delete session</button>
        </>
        :
        null
      }
    </div>
  )
}

export default SingleSession
