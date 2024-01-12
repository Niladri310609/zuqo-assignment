import axios from 'axios';







export const signup = (firstName,lastName,email, password) => {
  return async (dispatch) => {
    try {
      await axios.post('http://localhost:7001/agent/signup', { firstName,lastName, email, password });
      dispatch({ type: 'SIGNUP_SUCCESS' });
    } catch (error) {
      dispatch({ type: 'SIGNUP_ERROR', error: error.response.data.error });
    }
  };
};

export const login = (email, password) => {
    return async (dispatch) => {
      try {
        await axios.post('http://localhost:7001/agent/login', { email, password });
        dispatch({ type: 'LOGIN_SUCCESS' });
      } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', error: error.response.data.error });
      }
    };
  };
