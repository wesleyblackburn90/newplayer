const GET_SESSIONS = 'sessions/GET_SESSIONS'
const START_SESSION = 'sessions/START_SESSIONS'
const UPDATE_SESSION = 'sessions/UPDATE_SESSIONS'
const DELETE_SESSION = 'sessions/DELETE_SESSIONS'

const getSessions = (sessions) => ({
  type: GET_SESSIONS,
  sessions
})

const startSession = (session) => ({
  type: START_SESSION,
  session
})

const updateSession = (session) => ({
  type: UPDATE_SESSION,
  session
})

const deleteSession = (session) => ({
  type: DELETE_SESSION,
  session
})

export const getSessionsThunk = () => async (dispatch) => {
  const res = await fetch('/api/sessions')
  if (res.ok) {
    const data = await res.json()
    dispatch(getSessions(data.sessions))
  } else {
    const error = await res.json()
    throw error
  }
}

export const startSessionThunk = (data) => async (dispatch) => {
  const res = await fetch('/api/sessions/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (res.ok) {
    const session = await res.json()
    return dispatch(startSession(session))
  } else {
    const error = await res.json()
    throw error
  }
}

export const updateSessionThunk = (data, id) => async (dispatch) => {
  console.log(id, "This is the id")
  const res = await fetch(`/api/sessions/${id}/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (res.ok) {
    console.log("The res was ok")
    const session = await res.json()
    dispatch(updateSession(session))
    return session
  }
}

export const deleteSessionThunk = (sessionId) => async (dispatch) => {
  const response = await fetch(`/api/sessions/${sessionId}`, {
    method: 'delete',
  })

  if (response.ok) {
    console.log("Response was ok though")
    const session = await response.json()
    console.log(session)
    dispatch(deleteSession(session))
    console.log("I did it!")
    return session
  }
}

const initialState = {}

const gameSessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SESSIONS: {
      const allSessions = {}
      action.sessions.forEach((session) => (allSessions[session.id] = session))
      return allSessions
    }
    case START_SESSION: {
      const newState = {
        ...state,
        [action.session.id]: action.session
      }
      return newState
    }
    case UPDATE_SESSION: {
      const newState = {
        ...state,
        [action.session.id]: action.session
      }
      return newState
    }
    case DELETE_SESSION: {
      console.log("I'm in the reducer. Can I do that?")
      const newState = { ...state }
      delete newState[action.session.id]
      console.log("I deleted the thing")
      console.log(newState)
      return newState
    }
    default:
      return state;
  }
}

export default gameSessionReducer
