
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import DemoUser from './auth/DemoUser';
import { useSelector } from 'react-redux';
import CreateSession from './GameSession/CreateSession'
import "./NavBar.css"
import SearchBar from './SearchBar/SearchBar';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  const sessions = useSelector(state => state.gameSession)
  return (
    <nav>
      <div id="main-nav-bar-div">
        <NavLink to='/' exact={true} activeClassName='active' id="new-player-logo">
          New Player
        </NavLink>
        {/* <SearchBar placeholder="Find a game" data={sessions} /> */}
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
              Create a session
            </NavLink>
            <LogoutButton />
          </div>
        }
      </div>
    </nav>
  );
}

export default NavBar;
