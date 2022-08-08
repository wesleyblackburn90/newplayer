import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsThunk } from '../../store/review'
import ReviewForm from "./ReviewForm";
import SingleReview from "./SingleReview";
import EditReviewFormModal from "./EditReviewFormModal";

function Reviews({ userReviews, user }) {
  const dispatch = useDispatch()
  const { userId } = useParams()
  const currentUserId = useSelector((state) => state.session.user.id)
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(getReviewsThunk())
  }, [dispatch])


  return (
    //   <div className="review">
    //     <div>
    //       {reviews?.map(({ id, rating, review, userId }) => (
    //         <div key={id} className="reviewCard">
    //           <h1>Rating: {rating}</h1>
    //           <h1>{review}</h1>
    //           {userId === currentUserId ? <button onClick={(e) => { e.preventDefault(); handleDelete(id) }} id="deleteReviewButton">Delete review</button> : <></>}
    //         </div>
    //       ))}
    //     </div>
    //     {/* {reviews} */}
    //     {/* <p>User Ratings: {Math.round(reviewTotal)}</p> */}
    //     <div id="reviewForm">
    //       <button onClick={handleClick} className="reviewFormButton">Leave a review</button>
    //       <div className={showReviewForm}>

    //       </div>
    //     </div>
    //   </div>
    <div>
      {userReviews && userReviews.map(review => {
        return (
          <>
            <SingleReview singleReview={review} userId={userId} />
          </>
        )
      })
      }
      <ReviewForm userReviews={userReviews} profileId={userId} />
    </div>
  )
}

export default Reviews