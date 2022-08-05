import React from "react";
import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';

function UsersProfile({ user }) {

  return (
    <div>
      {user &&
        <h1>{user.username}</h1>
      }
    </div>
  )
}

export default UsersProfile
