const jwt = require('jsonwebtoken');
const User= require('../models/user')
 const userAuth = async(req,res,next)=>{
   // Read the Token
   try {
    const {token}= req.cookies;
    if(!token){
        throw new Error('invalid token')
    }
    //validate the token
    const decodedData = await jwt.verify(token, 'DEV@Tinder$123')
     const {_id}= decodedData
     const user = await User.findById(_id);
     console.log(user);
     
     if(!user){
      throw new Error('User not Found')
     }
     console.log('authUSer',user);
     req.user=  user
     next()
   }
   catch(err){
    res.status(400).send("ERROR"+ err.message)
   }
   


}


// const userAuth = (req,res,next)=>{
//     const token = 'xyz';
//     const isAuthorized = token === 'xyz'
//     if(isAuthorized){
//         next()
//     }
//     else {
//         res.status(401).send('Unauthorized')
//     }
// }

module.exports = {
    userAuth
}