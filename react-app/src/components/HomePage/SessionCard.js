import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSessionsThunk } from "../../store/gameSession"

function SessionCard({ session }) {
  return (
    <>
      <h1> {session.location_name} </h1>
    </>
  )
}

export default SessionCard
