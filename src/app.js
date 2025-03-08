const express =  require("express")

const app = express()
const connectDB = require("./config/database")
const User = require('./models/user');
const {validateSignup} = require('./utils/validation');
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const {userAuth}= require('./middlewares/auth')
app.use(express.json())
app.use(cookieParser())
//handling auth middle ware for all GET, Post,... requests

 app.post('/signUp', async (req,res)=>{
    console.log(req.body);
    // Creating a new instance of the user model.
   
    //validateSignup(req)
  try{
   validateSignup(req)
   //Encrypt the password
   const  {firstName,lastName,emailId,password} = req.body;
   const passwordHash =  await bcrypt.hash(password, 10)
   console.log(passwordHash);
   
   
   const user = new User({
      firstName,
      lastName,
      emailId,
      password:passwordHash
   })
   
   await user.save()
   res.send('data added succesfully')
  }
  catch(err){
   res.status(400).send("Error"+err)
   
  }

 })


 app.post('/login', async(req,res)=>{
   try{
   const {emailId, password} = req.body;
   const user=  await User.findOne({emailId:emailId});
   if(!user){
      throw new Error('Invalid Credentials')
   }
   const isPasswordValid = await bcrypt.compare(password, user.password);
   console.log(isPasswordValid);
   
   if(isPasswordValid){

      //create a token

      const token = await jwt.sign({_id:user._id}, "DEV@Tinder$123",{expiresIn:'1h'})
      console.log(token);
      
      res.cookie('token', token, {expires:new Date(Date.now()+ 90000)})
    res.send('login Successfully')
   }
   else {
      throw new Error('Invalid Credentials')
   }
}
catch(err){
   res.status(400).send('Error: '+ err.message)
}

 });

 app.get("/profile", userAuth, async(req,res)=>{
  
   try {
     const user= req.user
      res.send(user)
   }
   catch(err){
      res.status(400).send('Invalid Token')
   }
 });

 app.get('/user',userAuth, async (req,res)=>{
    const userEmail = req.body.emailId
    try {
       const users =  await User.findOne({emailId:userEmail})
       if(!users){
        res.status(404).send('User not found')
       }

       else {
        res.send(users)
       }
    }

    catch(err){
       res.status(400).send('something went wrong')
    }
    // try {
    //     const users =  await User.find({emailId: userEmail})
    //     if(users.length === 0){
    //         res.status(404).send('User not found')
    //     }
    //     else {
    //         res.send(users)
    //     }
    // } catch(err){
    //      res.status(400).send('Something went wrong')
    // }
    
   
    
 })

 app.post('/sendConnectionRequest', userAuth, async(req,res)=>{
   const user = req.user;
   res.send(user.firstName+" has sent a connection request")
 })


//  // get the  User by User  Id
//    app.get('/usersById', async(req,res)=>{
//     const usersId = req.body._id;
//      try {
    
//      const users = await User.findById(usersId)
//      if(!users){
//         res.status(404).send('User not Found')
//      }
//      else {
//         res.send(users)
//      }
//      console.log(users);
     
//      }
//      catch(err){
//         res.status(400).send('Something went wrong')
//      }
//    })
//    // feed api- to get all the users from database
//  app.get('/feed', async(req,res)=>{
//     try {
//        const users = await User.find({})
//        res.send(users)
//     }
//     catch(err){
//       res.status(400).send('something went wrong')
//     }
//  })

 //delete a user from database
//   app.delete('/user', async(req,res)=>{
//     try{
//      const userId = req.body.userId;
//      const users = await User.findByIdAndDelete(userId)
//      res.send('User Deleted Successfully')
//     }
//     catch(err){
//       res.status(404).send('something went wrong')
//     }
//   })


//   //Update Data of the User
//    app.patch('/user/:userId', async(req,res)=>{
//      const userId = req.params?.userId;
//      const data =  req.body;
//      try{

//         const ALLOWED_UPDATES = ['gender','skills', 'photoUrl', 'age','about']
//         const isUpdateAllowed = Object.keys(data).every((k)=>
//             ALLOWED_UPDATES.includes(k));
//          if(!isUpdateAllowed){
//            throw new Error('Update not Allowed')
//          }

//          if(data?.skills.length > 10){
//             throw new Error('skill should not be more than 10')
//          }
//        const users =  await User.findByIdAndUpdate({_id:userId}, data)
//        runValidators:true,
    
//        res.send('data update successfully')
//      }
//      catch(err){
//         res.status(400).send('something went wrong')
//      }
//    })

 
connectDB()
.then(()=>{
    console.log('database connection established');
    app.listen(3000, ()=>{
        console.log('server is listening on 3000');
        
    })
})
.catch((err)=>{
    console.error("database cannot be connected")
})

