import React, { useEffect, useState } from "react"
import { startTransition } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { startReviewThunk, deleteReviewThunk } from "../../store/review"

function ReviewForm({ singleReview, profileId }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentUserId = useSelector(state => state.session.user.id)
  const [rating, setRating] = useState("1")
  const [comment, setComment] = useState("")
  const [showReviewForm, setShowReviewForm] = useState("hide-review-form")


  const updateRating = (e) => setRating(e.target.value)
  const updateComment = (e) => setComment(e.target.value)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      reviewer_id: currentUserId,
      reviewee_id: profileId,
      rating,
      comment
    }

    dispatch(startReviewThunk(payload))
    setShowReviewForm("hide-review-form")
    history.push(`/users/${profileId}`)
  }

  const handleDelete = async () => {
    e.preventDefault()
    await dispatch(deleteReviewThunk(singleReview)).then(history.push(`/users/${profileId}`))
  }

  const handleClick = (e) => {
    e.preventDefault()
    setShowReviewForm("review-form")
  }

  const handleCancelClick = (e) => {
    e.preventDefault()
    setShowReviewForm("hide-review-form")
  }

  return (
    <div>
      < form onSubmit={handleSubmit} id="leaveReviewInputs" >
        <h3> Rating </h3>
        <select onChange={updateRating}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <h3> Review </h3>
        <input
          id="reviewBody"
          type="text"
          placeholder="Leave your review"
          value={comment}
          onChange={updateComment} />
        <button type="submit" className="reviewFormButton">Submit review</button>
        <button onClick={handleCancelClick} className="reviewFormButton">Cancel</button>
        <button onClick={handleDelete}>Delete</button>
      </form >
    </div>
  )
}

export default ReviewForm
