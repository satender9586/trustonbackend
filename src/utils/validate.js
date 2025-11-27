const validator = require("validator");

const validateSignUpInfo = (data) => {
  const { firstName, lastName, phoneNumber, emailId, password } = data;
  const errors = [];

  // First Name
  if (!firstName || firstName.trim().length === 0) {
    errors.push({ field: "firstName", message: "First name is required!" });
  } else if (firstName.trim().length > 20) {
    errors.push({ field: "firstName", message: "First name is too long!" });
  }

  // Phone number
  if (!phoneNumber || phoneNumber.trim().length === 0) {
    errors.push({ field: "phoneNumber", message: "Phone number is required!" });
  } else if (!/^\+?[0-9]{10,15}$/.test(phoneNumber)) {
    errors.push({ field: "phoneNumber", message: "Invalid phone number" });
  }

  // Password
  if (!password || password.trim().length === 0) {
    errors.push({ field: "password", message: "Password is required!" });
  } else if (password.length < 6) {
    errors.push({ field: "password", message: "Password must be at least 6 characters" });
  }

  // Email
  if (!emailId || emailId.trim().length === 0) {
    errors.push({ field: "emailId", message: "Email is required!" });
  } else if (!validator.isEmail(emailId)) {
    errors.push({ field: "emailId", message: "Invalid email format" });
  }

  return errors;
};

const validateLoginInfo=(data)=>{
  const{emailId, password}=data
   const errors = [];
    // Email
  if (!emailId || emailId.trim().length === 0) {
    errors.push({ field: "emailId", message: "Email is required!" });
  } else if (!validator.isEmail(emailId)) {
    errors.push({ field: "emailId", message: "Invalid email format" });
  }

  
  // Password
  if (!password || password.trim().length === 0) {
    errors.push({ field: "password", message: "Password is required!" });
  } else if (password.length < 6) {
    errors.push({ field: "password", message: "Password must be at least 6 characters" });
  }
  return errors

}

module.exports = { validateSignUpInfo ,validateLoginInfo};
