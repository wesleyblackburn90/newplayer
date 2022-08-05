import React from "react";
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from "react-router-dom";
import { getSessionsThunk, deleteSessionThunk } from "../../store/gameSession";
import EditSessionFormModal from "./EditSessionFormModal"
import EditSessionForm from "./EditSessionForm";
import UsersProfile from "../Profiles/UsersProfile";

function SingleSession() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { sessionId } = useParams()
  const session = useSelector((state) => (state.gameSession[sessionId]))
  const userId = useSelector((state) => (state.session.user.id))
  const users = useSelector((state) => (state.session.user))
  console.log(users)

  useEffect(() => {
    dispatch(getSessionsThunk())
  }, dispatch)

  const handleDelete = async () => {
    await dispatch(deleteSessionThunk(sessionId)).then(history.push('/sessions'))
  }


  return (
    <div>
      {session &&
        <div>
          <p>Location Name: {session.location_name}</p>
          {/* {session && session.organizer_id === } */}
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
      {session && userId === session.organizer_id ?
        <>
          <EditSessionFormModal session={session} />
          <button onClick={handleDelete}>Delete session</button>
        </>
        :
        <UsersProfile />
      }
    </div>
  )
}

export default SingleSession
