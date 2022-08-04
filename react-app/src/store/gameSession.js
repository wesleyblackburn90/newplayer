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
  console.log("I made it to the thunk")
  const res = await fetch('/api/sessions/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  console.log(res)
  console.log("The res is ok")
  if (res.ok) {
    const session = await res.json()
    return dispatch(startSession(session))
  } else {
    const error = await res.json()
    throw error
  }
}

export const updateSessionThunk = (data) => async (dispatch) => {
  const res = await fetch(`/api/sessions/${data.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (res.ok) {
    const session = await res.json()
    dispatch(updateSession(session))
    return session
  }
}

export const deleteSessionThunk = (sessionId) => async (dispatch) => {
  const response = await fetch(`/api/session/${sessionId}`, {
    method: 'delete',
  })

  if (response.ok) {
    const session = await response.json()
    dispatch(deleteSession(session))
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
      const newState = { ...state }
      delete newState[action.session.id]
      return newState
    }
    default:
      return state;
  }
}

export default gameSessionReducer
