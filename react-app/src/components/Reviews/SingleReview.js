import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteReviewThunk, getReviewsThunk } from '../../store/review'

function SingleReview({ review }) {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)

  const deleteHandler = async () => {
    await dispatch(deleteReviewThunk(review))
  }

  return (
    <div>
      {review &&
        <div>
          <h1>Rating: {review.rating}</h1>
          <h1>Review: {review.review}</h1>
        </div>
      }
    </div>
  )
}

export default SingleReview
