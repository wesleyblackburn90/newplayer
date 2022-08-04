// const GET_GAMES = 'games/GET_GAMES'
// const CREATE_GAME = 'games/CREATE_GAME'

// const getGames = (games) => ({
//   type: GET_GAMES,
//   games
// })

// const createGame = (game) => ({
//   type: CREATE_GAME,
//   game
// })

// export const getGamesThunk = () => async (dispatch) => {
//   const res = await fetch('/api/games')
//   if (res.ok) {
//     const data = await res.json()
//     dispatch(getGames(data.games))
//   } else {
//     const error = await res.json()
//     throw error
//   }
// }

// export const createGamesThunk = (data) => async (dispatch) => {
//   const res = await fetch('/api/games/new', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//   if (res.ok) {
//     const game = await res.json()
//     return dispatch(createGame(game))
//   } else {
//     const error = await res.json()
//     throw error
//   }
// }

// const initialState = {}

// const gameReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case GET_GAMES:
//       const allGames = {}
//       action.games.forEach((game) => (allGames[game.id] = game))
//       return allGames
//     case CREATE_GAME:
//       const newState = {
//         ...state,
//         [action.game.id]: action.game
//       }
//       return newState
//     default:
//       return state;
//   }
// }

// export default gameReducer
