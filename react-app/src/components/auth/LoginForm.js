import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import DemoUser from './DemoUser';
import "./LoginForm.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id='login-form-div'>
      <div id='left-side-login-div'>
        <NavLink to='/' id='login-newplayer-link'>New Player</NavLink>
        <form id='login-form' onSubmit={onLogin}>
          <div>
            {errors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </div>
          {/* <NavLink to='/' id='login-newplayer-link'>New Player</NavLink> */}
          <h1>Log in</h1>
          <div className='login-inputs'>
            <label htmlFor='email'>Email:  </label>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className='login-inputs'>
            <label htmlFor='password'>Password: </label>
            <input
              name='password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <div id="login-signup-buttons">
              <button className='button' type='submit'>Login</button>
              <DemoUser />
            </div>
            <p>Don't have an account? Sign up now!</p>
            <NavLink className='button sign-up-btn' to='/signup'>Sign up</NavLink>
          </div>
        </form>
      </div>
      <img id='login-pic' src='https://image.freepik.com/free-photo/company-young-people-playing-board-game_158595-4898.jpg' alt='family playing game'></img>
    </div>
  );
};

export default LoginForm;
