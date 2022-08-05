
  // const [rating, setRating] = useState("1")
  // const [review, setReview] = useState("")
  // const [showReviewForm, setShowReviewForm] = useState("hide-review-form")


  // const updateRating = (e) => setRating(e.target.value)
  // const updateReview = (e) => setReview(e.target.value)

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   const payload = {
  //     userId: currentUserId,
  //     businessId: businessId,
  //     rating,
  //     review
  //   }

  //   dispatch(createReview(payload))
  //   setShowReviewForm("hide-review-form")
  //   history.push(`/business/${businessId}`)
  // }

  // function handleDelete(id) {
  //   dispatch(deleteReviews(id, businessId))
  //   history.push(`/business/${businessId}`)
  // }

  // const handleClick = (e) => {
  //   e.preventDefault()
  //   setShowReviewForm("review-form")
  // }

  // const handleCancelClick = (e) => {
  //   e.preventDefault()
  //   setShowReviewForm("hide-review-form")
  // }

  // <form onSubmit={handleSubmit} id="leaveReviewInputs">
  //           <h3> Rating </h3>
  //           <select onChange={updateRating}>
  //             <option value="1">1</option>
  //             <option value="2">2</option>
  //             <option value="3">3</option>
  //             <option value="4">4</option>
  //             <option value="5">5</option>
  //           </select>
  //           <h3> Review </h3>
  //           <input
  //             id="reviewBody"
  //             type="text"
  //             placeholder="Leave your review"
  //             value={review}
  //             onChange={updateReview} />
  //           <button type="submit" className="reviewFormButton">Submit review</button>
  //           <button onClick={handleCancelClick} className="reviewFormButton">Cancel</button>
  //         </form>
