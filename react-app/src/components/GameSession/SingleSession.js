import React from "react";
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import { getSessionsThunk, deleteSessionThunk } from "../../store/gameSession";

function SingleSession() {
  const history = useHistory()
  const dispatch = useDispatch()
  const { sessionId } = useParams()
  const session = useSelector((state) => (state.session[sessionId]))

  console.log(session)
  console.log(sessionId)

  return (
    <h1>Howdy </h1>
  )
}

export default SingleSession
