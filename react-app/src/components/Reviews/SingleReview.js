import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteReviewThunk, getReviewsThunk } from '../../store/review'
import { useHistory } from "react-router-dom"
import EditReviewFormModal from "./EditReviewFormModal"
import './SingleReview.css'
import { getAllUsers } from "../../store/user"
import SessionCard from "../HomePage/SessionCard"

function SingleReview({ singleReview, userId }) {
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const users = useSelector((state) => state.user)

  const handleDelete = async (e) => {
    e.preventDefault()
    await dispatch(deleteReviewThunk(singleReview)).then(history.push(`/users/${userId}`))
  }

  console.log(singleReview)
  console.log(userId)
  console.log(users)

  useEffect(() => {
    getAllUsers()
  }, dispatch)

  return (
    <div>
      {singleReview && singleReview.reviewer_id === sessionUser.id ?
        (
          <div className="review-div">
            <h1></h1>
            <h1>Rating: {singleReview.rating}</h1>
            <h1>Review: {singleReview.comment}</h1>
            <EditReviewFormModal singleReview={singleReview} profileId={userId} />
            <button className="button" onClick={handleDelete}>Delete</button>
          </div>
        ) : (
          <div className="review-div">
            <h1>Rating: {singleReview.rating}</h1>
            <h1>Review: {singleReview.comment}</h1>
          </div>
        )
      }
    </div>
  )
}

export default SingleReview
