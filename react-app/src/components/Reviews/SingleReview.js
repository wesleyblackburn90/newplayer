import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteReviewThunk, getReviewsThunk } from '../../store/review'
import { useHistory } from "react-router-dom"
import EditReviewFormModal from "./EditReviewFormModal"

function SingleReview({ singleReview, userId }) {
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)

  const handleDelete = async (e) => {
    e.preventDefault()
    await dispatch(deleteReviewThunk(singleReview)).then(history.push(`/users/${userId}`))
  }

  return (
    <div>
      {singleReview && singleReview.reviewer_id === sessionUser.id ?
        (
          <div>
            <h1>Rating: {singleReview.rating}</h1>
            <h1>Review: {singleReview.comment}</h1>
            <EditReviewFormModal singleReview={singleReview} profileId={userId} />
            <button onClick={handleDelete}>Delete</button>
          </div>
        ) : (
          <div>
            <h1>Rating: {singleReview.rating}</h1>
            <h1>Review: {singleReview.comment}</h1>
          </div>
        )
      }
    </div>
  )
}

export default SingleReview
