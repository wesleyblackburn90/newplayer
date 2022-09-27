import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout())
    history.push("/login")

  };

  return (
    <button className="button" onClick={onLogout}>
      <img src="/static/logout.png" alt="logout icon" />
      <p>Log out</p>
    </button>
  );
};

export default LogoutButton;
