// reducers.js
const initialState = {
    signupError: null,
    loginError: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SIGNUP_SUCCESS':
        return { ...state, signupError: null };
      case 'SIGNUP_ERROR':
        return { ...state, signupError: action.error };
      case 'LOGIN_SUCCESS':
        return { ...state, loginError: null };
      case 'LOGIN_ERROR':
        return { ...state, loginError: action.error };
      default:
        return state;
    }
  };
  
  export default authReducer;
  