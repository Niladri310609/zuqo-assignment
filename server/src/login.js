// src/Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loginSuccess, loginFailure } from './redux/actions';

const Login = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:7001/agent/login', {
        username,
        password,
      });

      if (response.data.status === true) {
        dispatch(loginSuccess());
      } else {
        dispatch(loginFailure(response.data.message));
      }
    } catch (error) {
      console.error('Error during login:', error);
      dispatch(loginFailure('An error occurred during login.'));
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      {isAuthenticated ? <p>Login successful!</p> : null}
    </div>
  );
};

export default Login;
