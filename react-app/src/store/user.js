const GET_USERS = 'user/GET_USERS'

const getUsers = (users) => ({
  type: GET_USERS,
  users
})


export const getAllUsers = () => async (dispatch) => {
  const response = await fetch('/api/users/users')

  if (response.ok) {
    const data = await response.json()
    dispatch(getUsers(data))
  } else {
    const error = await response.json()
    throw error
  }
}

const initialState = {}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS: {
      const allUsers = { ...state }
      action.users.users.forEach((user) => (allUsers[user.id] = user))
      return allUsers
    }
    default:
      return state
  }
}

export default usersReducer
