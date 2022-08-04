
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import DemoUser from './auth/DemoUser';
import { useSelector } from 'react-redux';
import CreateSession from './GameSession/CreateSession'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user)
  return (
    <nav>
      <ul>
        <NavLink to='/' exact={true} activeClassName='active'>
          New Player
        </NavLink>
        {!sessionUser ?
          <div className="logged-out-buttons">
            <li>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
            <li>
              <DemoUser />
            </li>
          </div>
          :
          <div className="logged-in-buttons">
            <li>
              <NavLink to='/sessions/new' exact={true}>
                Create a session
              </NavLink>
            </li>
            <li>
              <LogoutButton />
            </li>
          </div>
        }
      </ul>
    </nav>
  );
}

export default NavBar;
