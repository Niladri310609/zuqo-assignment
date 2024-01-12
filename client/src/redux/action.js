import axios from 'axios';








export const login = (email, password) => {
    return async (dispatch) => {
      try {
     const response =   await axios.post('http://localhost:7001/agent/login', { email, password });
        dispatch({ type: 'LOGIN_SUCCESS', response:response.data });

      return response
      } catch (error) {
        dispatch({ type: 'LOGIN_ERROR', error: error.response.data.error });
      }
    };
  };
