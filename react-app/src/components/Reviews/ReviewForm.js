import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { startReviewThunk, deleteReviewThunk } from "../../store/review"
import "./ReviewForm.css"

function ReviewForm({ singleReview, profileId }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const currentUserId = useSelector(state => state.session.user.id)
  const [rating, setRating] = useState("1")
  const [comment, setComment] = useState("")
  const [validationErrors, setValidationErrors] = useState([])
  const [showReviewForm, setShowReviewForm] = useState("hide-review-form")


  const updateRating = (e) => setRating(e.target.value)
  const updateComment = (e) => setComment(e.target.value)

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()

      const payload = {
        reviewer_id: currentUserId,
        reviewee_id: profileId,
        rating,
        comment
      }
      const newReview = await dispatch(startReviewThunk(payload))
      if (newReview) {
        setShowReviewForm("hide-review-form")
        history.push(`/users/${profileId}`)
      }
    }
    catch (err) {
      let newErrors
      let prettyErrors
      if (err) {
        newErrors = Object.values(err).map((error) => error[0].split(":"))
        if (newErrors) {
          prettyErrors = Object.values(newErrors).map((error) => error[1])
        }
      }
      setValidationErrors(prettyErrors)
    }
  }

  const handleDelete = async (e) => {
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
    <div id="leave-review-div">
      <h2>Leave your review</h2>
      < form onSubmit={handleSubmit} id="leaveReviewInputs" >
        <div id="rating-div">
          <h3> Rating </h3>
          <select className="rating-select" onChange={updateRating}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <h2>Add a written review</h2>
        <div id="review-div">
          <h3> Review </h3>
          <textarea
            rows="5"
            id="reviewBody"
            type="text"
            placeholder="Leave your review"
            value={comment}
            onChange={updateComment} />
        </div>
        <div id="submit-button-div">
          <button type="submit" className="reviewFormButton button">Submit review</button>
        </div>
        {/* <button onClick={handleCancelClick} className="reviewFormButton button">Cancel</button> */}
        {/* <button className="button" onClick={handleDelete}>Delete</button> */}
        {validationErrors && validationErrors.length > 0 && validationErrors.map((error) => {
          return <p style={{ "color": "red" }}> * {error}</p>
        })}
      </form >
    </div>
  )
}

export default ReviewForm
