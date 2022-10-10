
import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import DemoUser from './auth/DemoUser';
import { useDispatch, useSelector } from 'react-redux';
import CreateSession from './GameSession/CreateSession'
import "./NavBar.css"
import SearchBar from './SearchBar/SearchBar';
import addSessionIcon from '../icons/icons8-plus.svg'
import { getSessionsThunk } from '../store/gameSession';

const NavBar = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const sessions = useSelector(state => state.gameSession)

  useEffect(() => {
    dispatch(getSessionsThunk)
  }, dispatch)

  return (
    <nav>
      <div id="main-nav-bar-div">
        <NavLink to='/' exact={true} activeClassName='active' id="new-player-logo">
          New Player
        </NavLink>
        <div id='search-bar-wrapper'>
          <div id='search-bar-container'>
            <SearchBar placeholder="Find a game" data={sessions} />
          </div>
        </div>
        {!sessionUser ?
          <div className="logged-out-buttons-div">
            <NavLink to='/login' exact={true} activeClassName='active' className="button">
              Login
            </NavLink>
            <NavLink to='/sign-up' exact={true} activeClassName='active' className="button">
              Sign Up
            </NavLink>
            <DemoUser />
          </div>
          :
          <div className="logged-in-buttons-div">
            <NavLink className='button' id='create-button' to='/sessions/new' exact={true}>
              <img src={addSessionIcon} alt="add session" />
              <p>Create a session</p>
            </NavLink>
            <NavLink className="button" to={`/users/${sessionUser.id}`}>
              <img src="/static/user.png" alt="profile icon" />
              <p>Profile</p>
            </NavLink>
            <LogoutButton />
          </div>
        }
      </div>
    </nav>
  );
}

export default NavBar;
