import React from 'react';
import { demoUserLogin } from "../../store/session"
import { useDispatch } from 'react-redux';

const DemoUser = () => {
  const dispatch = useDispatch()

  const handleDemoLogin = async (e) => {
    e.preventDefault()
    return dispatch(demoUserLogin())
  }

  return (
    <button className="button" onClick={handleDemoLogin}>Demo User</button>
  )
}

export default DemoUser
