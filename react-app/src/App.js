import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import CreateSession from './components/GameSession/CreateSession';
import Sessions from './components/GameSession/Sessions';
import HomePage from './components/HomePage/HomePage';
import SingleSession from './components/GameSession/SingleSession';
import EditSessionForm from './components/GameSession/EditSessionForm';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute> */}
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <HomePage />
        </ProtectedRoute>
        <ProtectedRoute path='/sessions/new'>
          <CreateSession />
        </ProtectedRoute>
        <Route path='/sessions' exact={true}>
          <Sessions />
        </Route>
        <Route path='/sessions/:sessionId' exact={true}>
          <SingleSession />
        </Route>
        {/* <ProtectedRoute path='/sessions/:sessionId/edit'>
          <EditSessionForm />
        </ProtectedRoute> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
