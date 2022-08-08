import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSessionsThunk } from "../../store/gameSession"

function SessionsBar() {
  const dispatch = useDispatch()
  const sessions = useSelector(state => state.sessions)

  const displaySessions = Object.values(sessions)

  while (displaySessions > 4) {
    displaySessions.pop()
  }

  useEffect(() => {
    const fetchSessions = async () => {
      await dispatch(getSessionsThunk())
    }
    fetchSessions().catch(console.error)
  }, [dispatch])

  return (
    sessions ?
      <>
        <h1>Game sessions near you</h1>
        {Object.values(sessions).map((session) => (
          <SessionCard session={session} />
        ))}
      </> :
      <>
        <p> ... Searching </p>
      </>
  )
}

export default SessionsBar
