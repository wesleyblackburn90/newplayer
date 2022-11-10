const GET_SESSIONS = 'sessions/GET_SESSIONS'
const START_SESSION = 'sessions/START_SESSIONS'
const UPDATE_SESSION = 'sessions/UPDATE_SESSIONS'
const DELETE_SESSION = 'sessions/DELETE_SESSIONS'
const GET_KEY = 'sessions/GET_KEY'

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

const getKey = (key) => ({
  type: GET_KEY,
  payload: key
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

  const { address, city, state, description, game, location_name, organizer_id, pic_url, players_num, zip_code, date_time } = data
  console.log(date_time)

  const formData = new FormData()

  formData.append("address", address)
  formData.append("city", city)
  formData.append("state", state)
  formData.append("description", description)
  formData.append("game", game)
  formData.append("location_name", location_name)
  formData.append("organizer_id", organizer_id)
  formData.append("pic_url", pic_url)
  formData.append("players_num", players_num)
  formData.append("zip_code", zip_code)
  formData.append("date_time", date_time)

  const res = await fetch('/api/sessions/new', {
    method: 'POST',
    body: formData
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
  const res = await fetch(`/api/sessions/${id}/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (res.ok) {
    const session = await res.json()
    dispatch(updateSession(session))
    return session
  } else {
    const error = await res.json()
    throw error
  }
}

export const deleteSessionThunk = (sessionId) => async (dispatch) => {
  const response = await fetch(`/api/sessions/${sessionId}`, {
    method: 'delete',
  })

  if (response.ok) {
    const session = await response.json()
    dispatch(deleteSession(session))
    return session
  } else {
    const error = await response.json()
    throw error
  }
}

export const getKeyThunk = () => async (dispatch) => {
  const res = await fetch('/api/sessions/apikey')
  if (res.ok) {
    const key = await res.json()
    dispatch(getKey(key))
  } else {
    const error = await res.json()
    throw error
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
    case GET_KEY: {
      return { ...state, apiKey: action.payload }
    }
    default:
      return state;
  }
}

export default gameSessionReducer
