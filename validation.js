//validation for Value
const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value !== "string" || value == "") return false;
    return true;
  };
  
  //validation of  empty string
  const validString = function (value) {
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };
  

  const isValidRequestBody = function (request) {
    return Object.keys(request).length > 0;
  };
  const isValidEmail = function (email) {
    const emailRegex = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z0-9]{2,6})+$/;
  
    return emailRegex.test(email);
  };
  const isValidPassword = function (password) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
  
    //(/[\d`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/)
    return passwordRegex.test(password);
  };
  const isValidName = function (name) {
    const nameRegex = /^[A-Za-z\s]+$/i;
    return nameRegex.test(name);
  };
  module.exports = {
    isValid,
  validString,
      isValidRequestBody,
      isValidEmail,
      isValidPassword,isValidName
  };
  