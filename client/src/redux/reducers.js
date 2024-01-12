// reducers.js
const initialState = {
    loginError: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {

      case 'LOGIN_SUCCESS':
        return { ...state, loginError: null };
      case 'LOGIN_ERROR':
        return { ...state, loginError: action.error };
      default:
        return state;
    }
  };
  
  export default authReducer;
  