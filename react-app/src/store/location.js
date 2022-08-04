const GET_LOCATIONS = 'locations/GET_LOCATIONS'
const CREATE_LOCATION = 'locations/CREATE_LOCATION'

const getLocations = (locations) => ({
  type: GET_LOCATIONS,
  locations
})

const createLocation = (location) => ({
  type: CREATE_LOCATION,
  location
})

export const getLocationsThunk = () => async (dispatch) => {
  const res = await fetch('/api/locations')
  if (res.ok) {
    const data = await res.json()
    dispatch(getLocations(data.locations))
  } else {
    const error = await res.json()
    throw error
  }
}

export const createLocationsThunk = (data) => async (dispatch) => {
  const res = await fetch('/api/locations/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (res.ok) {
    const location = await res.json()
    return dispatch(createLocation(location))
  } else {
    const error = await res.json()
    throw error
  }
}

const initialState = {}

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOCATIONS: {
      const allLocations = {}
      action.locations.forEach((location) => (allLocations[location.id] = location))
      return allLocations
    }
    case CREATE_LOCATION: {
      const newState = {
        ...state,
        [action.location.id]: action.location
      }
      return newState
    }
    default:
      return state;
  }
}

export default locationReducer
