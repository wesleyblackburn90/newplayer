import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import Reviews from './Reviews/Reviews';
import { getReviewsThunk } from '../store/review.js'
import './User.css'
import { getSessionsThunk } from '../store/gameSession';
import SessionCard from './HomePage/SessionCard';

function User() {
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const reviews = useSelector(state => state.review)
  const sessionList = useSelector(state => state.gameSession)
  const hostSessions = Object.values(sessionList).filter(session => session.organizer_id === parseInt(userId))
  console.log(hostSessions)

  let userReviews
  let totalRating
  let actualRating
  let arrLength
  if (reviews && userId) {
    userReviews = Object.values(reviews).filter(review => review.reviewee_id === parseInt(userId))

    if (userReviews) {
      totalRating = userReviews.reduce((arr, review) => {
        arr.push(review.rating)
        return arr
      }, [])

      if (totalRating) {
        arrLength = totalRating.length
        actualRating = totalRating.reduce((total, num) => {
          return total += num
        }, 0)
      }
    }
  }

  useEffect(() => {
    dispatch(getReviewsThunk())
    dispatch(getSessionsThunk())
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
    <>
      <div id="profile-container">
        <div id="profile-wrapper-div">
          <div id="profile-top-div">
            <h1>Host: {user.username}</h1>
            <p>Rating: {Math.floor(actualRating / totalRating.length)} out of 5</p>
          </div>
        </div>
        <h2>Other events hosted by {user.username}</h2>
        <div id="profile-bottom-div">
          <div id="profile-session-cards">
            {hostSessions.map((session) => (
              <SessionCard session={session} />
            ))}
          </div>
          <div id="user-profile-reviews-div">
            <h2>See what other users had </h2>
            <h2>to say about {user.username}</h2>
            <Reviews userReviews={userReviews} user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
export default User;
