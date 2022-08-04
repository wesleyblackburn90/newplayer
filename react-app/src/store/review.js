const GET_REVIEWS = 'reviews/GET_REVIEWS'
const CREATE_REVIEW = 'reviews/CREATE_REVIEWS'
const UPDATE_REVIEW = 'reviews/UPDATE_REVIEWS'
const DELETE_REVIEW = 'reviews/DELETE_REVIEWS'

const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews
})

const createReview = (review) => ({
  type: CREATE_REVIEW,
  review
})

const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  review
})

const deleteReview = (review) => ({
  type: DELETE_REVIEW,
  review
})

export const getReviewsThunk = () => async (dispatch) => {
  const res = await fetch('/api/reviews')
  if (res.ok) {
    const data = await res.json()
    dispatch(getReviews(data.reviews))
  } else {
    const error = await res.json()
    throw error
  }
}

export const startReviewThunk = (data) => async (dispatch) => {
  const res = await fetch('/api/reviews/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (res.ok) {
    const review = await res.json()
    return dispatch(createReview(review))
  } else {
    const error = await res.json()
    throw error
  }
}

export const updateReviewThunk = (data) => async (dispatch) => {
  const res = await fetch(`/api/reviews/${data.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (res.ok) {
    const review = await res.json()
    dispatch(updateReview(review))
    return review
  }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: 'delete',
  })

  if (response.ok) {
    const review = await response.json()
    dispatch(deleteReview(review))
    return review
  }
}

const initialState = {}

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS: {
      const allReviews = {}
      action.reviews.forEach((review) => (allReviews[review.id] = review))
      return allReviews
    }
    case CREATE_REVIEW: {
      const newState = {
        ...state,
        [action.review.id]: action.review
      }
      return newState
    }
    case UPDATE_REVIEW: {
      const newState = {
        ...state,
        [action.review.id]: action.review
      }
      return newState
    }
    case DELETE_REVIEW: {
      const newState = { ...state }
      delete newState[action.review.id]
      return newState
    }
    default:
      return state;
  }
}

export default reviewReducer
