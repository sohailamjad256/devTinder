 const validator = require('validator')
 const validateSignup = (req)=>{
   const {firstName, lastName, emailId,password}= req.body;
   if(!firstName || !lastName) {
      throw new Error('name is missing')
   }
   else if(!validator.isEmail(emailId)){
     throw new Error('Email is not Valid')
   }
   else if(!validator.isStrongPassword(password)){
      throw new Error('Password is not strong')
   }
   
 }

 module.exports = {
    validateSignup
 }