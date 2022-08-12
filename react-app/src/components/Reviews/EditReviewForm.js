import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { startReviewThunk, deleteReviewThunk, updateReviewThunk, getReviewsThunk } from "../../store/review"

function EditReviewForm({ singleReview, profileId, setShowModal }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentUserId = useSelector(state => state.session.user.id)
  const [rating, setRating] = useState("1")
  const [comment, setComment] = useState("")
  const [showReviewForm, setShowReviewForm] = useState("hide-review-form")
  const [validationErrors, setValidationErrors] = useState([])


  const updateRating = (e) => setRating(e.target.value)
  const updateComment = (e) => setComment(e.target.value)

  const handleUpdate = async (e) => {
    try {
      e.preventDefault()

      const payload = {
        id: singleReview.id,
        reviewer_id: currentUserId,
        reviewee_id: profileId,
        rating,
        comment
      }

      const newReview = await dispatch(updateReviewThunk(payload))

      if (newReview) {
        history.push(`/users/${profileId}`)
        setShowModal(false)
      }
      console.log(validationErrors)
    }
    catch (error) {
      setValidationErrors(error.errors)
      console.log(validationErrors)
    }
  }

  useEffect(() => {
    dispatch(getReviewsThunk())
  }, dispatch)

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
      <h1>Edit your review</h1>
      {validationErrors && validationErrors.length > 0 && validationErrors.map((error) => {
        return <li>{error}</li>
      })}
      <form onSubmit={handleUpdate} id="leaveReviewInputs" >
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
        <button type='submit' className="reviewFormButton button">Submit review</button>
      </form >
    </div>
  )
}

export default EditReviewForm
