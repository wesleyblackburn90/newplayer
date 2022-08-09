
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import DemoUser from './auth/DemoUser';
import { useSelector } from 'react-redux';
import CreateSession from './GameSession/CreateSession'
import "./NavBar.css"

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  return (
    <nav>
      <div id="main-nav-bar-div">
        <NavLink to='/' exact={true} activeClassName='active' id="new-player-logo">
          New Player
        </NavLink>
        {!sessionUser ?
          <div className="logged-out-buttons-div">
            <NavLink to='/login' exact={true} activeClassName='active' className="logged-out-buttons">
              Login
            </NavLink>
            <NavLink to='/sign-up' exact={true} activeClassName='active' className="logged-out-buttons">
              Sign Up
            </NavLink>
            <DemoUser />
          </div>
          :
          <div className="logged-in-buttons-div">
            <NavLink to='/sessions/new' exact={true}>
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
