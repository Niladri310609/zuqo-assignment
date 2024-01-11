// actions.js
export const loginSuccess = () => ({
    type: 'LOGIN_SUCCESS',
  });
  
  export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error,
  });
  