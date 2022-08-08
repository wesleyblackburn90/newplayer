const GET_PLAYERS = 'players/GET_PLAYERS'
const ADD_PLAYERS = 'players/ADD_PLAYERS'

const getPlayers = (players) => ({
  type: GET_PLAYERS,
  players
})

const addPlayers = (player) => ({
  type: ADD_PLAYERS,
  player
})

export const getAllPlayers = () => async (dispatch) => {
  console.log("I made it to the thunk")
  const res = await fetch('/api/players')
  if (res.ok) {
    const data = await res.json()
    dispatch(getPlayers(data.players))
  } else {
    const error = await res.json()
    throw error
  }
}

export const addNewPlayer = (data) => async (dispatch) => {
  const res = await fetch('/api/players/new', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (res.ok) {
    const player = await res.json()
    return dispatch(addPlayers(player))
  } else {
    const error = await res.json()
    throw error
  }
}

const initialState = {}

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYERS: {
      const allPlayers = {}
      action.players.forEach((player) => (allPlayers[player.id] = player))
      return allPlayers
    }
    case ADD_PLAYERS: {
      const newState = {
        ...state,
        [action.player.id]: action.player
      }
      return newState
    }
    default:
      return state
  }
}

export default playerReducer
