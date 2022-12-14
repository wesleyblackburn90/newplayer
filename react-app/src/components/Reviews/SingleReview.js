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

  const reviewer = Object.values(users).filter((user) => user.id === singleReview.reviewer_id)

  const handleDelete = async (e) => {
    e.preventDefault()
    await dispatch(deleteReviewThunk(singleReview)).then(history.push(`/users/${userId}`))
  }

  useEffect(() => {
    // const fetchUsers = async () => {
    //   await dispatch(getAllUsers())
    // }
    // fetchUsers().catch(console.error)
    dispatch(getAllUsers())
  }, [dispatch])

  return (
    <div>
      {reviewer && singleReview && singleReview.reviewer_id === sessionUser.id ?
        (
          <div className="review-div">
            <h3 style={{ "text-decoration": "none" }}>User: {reviewer[0]?.username}</h3>
            <p>Rating: {singleReview.rating}</p>
            <p>Review: {singleReview.comment}</p>
            <EditReviewFormModal singleReview={singleReview} profileId={userId} />
            <button className="button" onClick={handleDelete}>Delete</button>
          </div>
        ) : (
          <div className="review-div">
            <h3 style={{ "text-decoration": "none" }}>User: {reviewer[0]?.username}</h3>
            <p>Rating: {singleReview.rating}</p>
            <p>Review: {singleReview.comment}</p>
          </div>
        )
      }
    </div>
  )
}

export default SingleReview
