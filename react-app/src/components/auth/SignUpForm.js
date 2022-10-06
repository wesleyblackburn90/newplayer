import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./SignUpForm.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();


  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, first_name, last_name, email, password));
      // if (data) {
      //   let newErrors
      //   let prettyErrors
      //   if (data) {
      //     newErrors = Object.values(data).map((error) => error.split(":"))
      //     if (newErrors) {
      //       prettyErrors = Object.values(newErrors).map((error) => error[1])
      //     }
      //   }
      //   setErrors(prettyErrors)
      // }
    }
  };


  useEffect(() => {
    let errors = []

    if (username.length > 40) errors.push("Please enter a valid username that's less than 40 characters")
    if (first_name.length > 50) errors.push("Name too long")
    if (last_name.length > 50) errors.push("Name too long")
    if (email.length > 255) errors.push("Please enter a shorter email address")
    if (password !== repeatPassword) errors.push("Please make sure your passwords match!")



    setErrors(errors)
  }, [username, first_name, last_name, email, password, repeatPassword])

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  // let newErrors
  // let prettyErrors
  // if (errors) {
  //   newErrors = Object.values(errors).map((error) => error.split(":"))
  //   if (newErrors) {
  //     prettyErrors = Object.values(newErrors).map((error) => error[1])
  //   }
  // }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div id="sign-up-form-div">
        <div id="left-side-sign-up-div">
          <form id='signup-form' onSubmit={onSignUp}>
            <h1>Sign Up</h1>
            <div>
              <label>User Name: </label>
              <input
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div>
              <label>First Name: </label>
              <input
                type='text'
                name='first_name'
                onChange={updateFirstName}
                value={first_name}
              ></input>
            </div>
            <div>
              <label>Last Name: </label>
              <input
                type='text'
                name='Last Name'
                onChange={updateLastName}
                value={last_name}
              ></input>
            </div>
            <div>
              <label>Email: </label>
              <input
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div>
              <label>Password: </label>
              <input
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div>
              <label>Repeat Password: </label>
              <input
                type='password'
                name='repeat_password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <button className="button" type='submit'>Sign Up</button>
          </form>
          {errors.length ? <div id='signup-errors-div'>
            {errors.length > 0 &&
              <ul>
                {errors?.map((error) => (
                  <p style={{ "color": "red" }}> * {error} </p>
                ))}
              </ul>
            }
          </div>
            :
            <h1 id="sign-up-header">Sign up to make your first game session!</h1>
          }
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
