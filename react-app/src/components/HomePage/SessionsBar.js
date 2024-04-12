import React, { useEffect, useState } from "react"
import { NavLink, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getSessionsThunk } from "../../store/gameSession"
import SessionCard from "./SessionCard"
import "./SessionsBar.css"

function SessionsBar() {
  const dispatch = useDispatch()
  const history = useHistory()
  const sessions = useSelector(state => state?.gameSession)
  const sessionsArr = Object.values(sessions)
  const [state, setState] = useState("")
  const [displaySessions, setDisplaySessions] = useState([])
  const [randomSessions, setRandomSessions] = useState([])

  const updateState = (e) => setState(e.target.value)

  useEffect(() => {
    const fetchSessions = async () => {
      await dispatch(getSessionsThunk())
    }
    fetchSessions().catch(console.error)
  }, [dispatch])

  useEffect(() => {
    const statesArr = Object.values(sessions).filter((currentState) => currentState.state === state)
    setDisplaySessions(statesArr)
  }, [state])

  useEffect(() => {
    let randomArr = []
    let newArr = [...Object.values(sessions)]
    for (let i = 0; i < 4; i++) {
      let random = Math.floor(Math.random() * newArr.length)
      randomArr.push(newArr[random])
      newArr.splice(random, 1)
    }
    setRandomSessions(randomArr)
  }, [sessions])


  while (displaySessions.length > 4) {
    displaySessions.splice(4)
  }

  // while (sessionsArr.length > 4) {
  //   sessionsArr.splice(4)
  // }


  return (
    sessions ?
      <>
        <div id="games-near-you-div">
          <div id="games-near-you-inner">
            <h1>Popular in: </h1>
            <select className="state-selector" value={state} onChange={updateState} placeholder="Choose a state">
              <option value={""}>Choose a state</option>
              <option value={"Alabama"}> Alabama </option>
              <option value={"Alaska"}> Alaska </option>
              <option value={"Arizona"}> Arizona </option>
              <option value={"Arkansas"}> Arkansas </option>
              <option value={"California"}> California </option>
              <option value={"Colorado"}> Colorado </option>
              <option value={"Connecticut"}> Connecticut </option>
              <option value={"Delaware"}> Delaware </option>
              <option value={"Florida"}> Florida </option>
              <option value={"Georgia"}> Georgia </option>
              <option value={"Hawaii"}> Hawaii </option>
              <option value={"Idaho"}> Idaho </option>
              <option value={"Illinois"}> Illinois </option>
              <option value={"Indiana"}> Indiana </option>
              <option value={"Iowa"}> Iowa </option>
              <option value={"Kansas"}> Kansas </option>
              <option value={"Kentucky"}> Kentucky </option>
              <option value={"Louisiana"}> Louisiana </option>
              <option value={"Maine"}> Maine </option>
              <option value={"Maryland"}> Maryland </option>
              <option value={"Massachusetts"}> Massachusetts </option>
              <option value={"Michigan"}> Michigan </option>
              <option value={"Minnesota"}> Minnesota </option>
              <option value={"Mississippi"}> Mississippi </option>
              <option value={"Missouri"}> Missouri </option>
              <option value={"Montana"}> Montana </option>
              <option value={"Nebraska"}> Nebraska </option>
              <option value={"Nevada"}> Nevada </option>
              <option value={"New Hampshire"}> New Hampshire </option>
              <option value={"New Jersey"}> New Jersey </option>
              <option value={"New Mexico"}> New Mexico </option>
              <option value={"New York"}> New York </option>
              <option value={"North Carolina"}> North Carolina </option>
              <option value={"North Dakota"}> North Dakota </option>
              <option value={"Ohio"}> Ohio </option>
              <option value={"Oklahoma"}> Oklahoma </option>
              <option value={"Oregon"}> Oregon </option>
              <option value={"Pennsylvania"}> Pennsylvania </option>
              <option value={"Rhode Island"}> Rhode Island </option>
              <option value={"South Carolina"}> South Carolina </option>
              <option value={"South Dakota"}> South Dakota </option>
              <option value={"Tennessee"}> Tennessee </option>
              <option value={"Texas"}> Texas </option>
              <option value={"Utah"}> Utah </option>
              <option value={"Vermont"}> Vermont </option>
              <option value={"Virginia"}> Virginia </option>
              <option value={"Washington"}> Washington </option>
              <option value={"West Virginia"}> West Virginia </option>
              <option value={"Wisconsin"}> Wisconsin </option>
              <option value={"Wyoming"}> Wyoming </option>
            </select>
          </div>
        </div>
        <div id="sessions-container">
          <div id='sessions-bar-container'>
            {!state || state === "Choose a state" ?
              <h1 className="suggestion-header" style={{ 'color': 'black' }}>Events that you might like: </h1>
              :
              <h1 className="suggestion-header">Events in {state}</h1>
            }
            {state ?
              displaySessions && displaySessions.length > 0 ?
                <div id='events-session-bar'>
                  {Object.values(displaySessions).map((session) => (
                    <SessionCard session={session} />
                  ))}
                  <NavLink id="all-sessions-button" to={`/${state}/sessions`}>See all sessions in {state}</NavLink>
                </div> :
                <h1 id="no-events-header">There are currently no events being held in this state! Click Create a Session at the top of the page to be the first!</h1>
              :
              <div id='events-session-bar'>
                {randomSessions?.map((session) => (
                  <SessionCard session={session} />
                ))}
              </div>
            }
          </div>
        </div>
      </> :
      <p> ... Searching </p>
  )
}

export default SessionsBar
