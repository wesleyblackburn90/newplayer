import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteReviewThunk, getReviewsThunk } from '../../store/review'
import EditReviewFormModal from "./EditReviewFormModal"

function SingleReview({ singleReview, userId }) {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)

  const deleteHandler = async () => {
    await dispatch(deleteReviewThunk(singleReview))
  }

  return (
    <div>
      {singleReview &&
        <div>
          <h1>Rating: {singleReview.rating}</h1>
          <h1>Review: {singleReview.comment}</h1>
          <EditReviewFormModal singleReview={singleReview} profileId={userId} />
        </div>
      }
    </div>
  )
}

export default SingleReview
