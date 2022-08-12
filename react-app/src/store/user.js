const GET_USERS = 'user/GET_USERS'

const getUsers = (users) => ({
  type: GET_USERS,
  users
})


export const getAllUsers = () => async (dispatch) => {
  console.log("hello")
  const response = await fetch('/api/users/users')

  if (response.ok) {
    console.log("I'm ok!")
    const data = await response.json()
    dispatch(getUsers(data))
  } else {
    console.log("I'm not ok :(")
    const error = await response.json()
    throw error
  }
}

const initialState = {}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS: {
      const allUsers = { ...state }
      console.log(action.users)
      action.users.users.forEach((user) => (allUsers[user.id] = user))
      return allUsers
    }
    default:
      return state
  }
}

export default usersReducer
