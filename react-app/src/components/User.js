import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import Reviews from './Reviews/Reviews';
import { getReviewsThunk } from '../store/review.js'

function User() {
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const reviews = useSelector(state => state.review)

  let userReviews
  if (reviews && userId) {
    userReviews = Object.values(reviews).filter(review => review.reviewee_id == userId)
  }

  // useEffect(() => )

  useEffect(() => {
    dispatch(getReviewsThunk())
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId, dispatch]);

  if (!user) {
    return null;
  }

  return (
    <ul>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
      <Reviews userReviews={userReviews} user={user} />
    </ul>
  );
}
export default User;
