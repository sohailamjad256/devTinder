const express =  require("express")

const app = express()
const connectDB = require("./config/database")
const User = require('./models/user')
app.use(express.json())
//handling auth middle ware for all GET, Post,... requests

 app.post('/signUp', async (req,res)=>{
    console.log(req.body);
    // Creating a new instance of the user model.
    const user = new User(req.body)

   await user.save()
    res.send('data added succesfully')
 })

 app.get('/user', async (req,res)=>{
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

 // get the  User by User  Id
   app.get('/usersById', async(req,res)=>{
    const usersId = req.body._id;
     try {
    
     const users = await User.findById(usersId)
     if(!users){
        res.status(404).send('User not Found')
     }
     else {
        res.send(users)
     }
     console.log(users);
     
     }
     catch(err){
        res.status(400).send('Something went wrong')
     }
   })
   // feed api- to get all the users from database
 app.get('/feed', async(req,res)=>{
    try {
       const users = await User.find({})
       res.send(users)
    }
    catch(err){
      res.status(400).send('something went wrong')
    }
 })

 //delete a user from database
  app.delete('/user', async(req,res)=>{
    try{
     const userId = req.body.userId;
     const users = await User.findByIdAndDelete(userId)
     res.send('User Deleted Successfully')
    }
    catch(err){
      res.status(404).send('something went wrong')
    }
  })


  //Update Data of the User
   app.patch('/user/:userId', async(req,res)=>{
     const userId = req.params?.userId;
     const data =  req.body;
     try{

        const ALLOWED_UPDATES = ['gender','skills', 'photoUrl', 'age','about']
        const isUpdateAllowed = Object.keys(data).every((k)=>
            ALLOWED_UPDATES.includes(k));
         if(!isUpdateAllowed){
           throw new Error('Update not Allowed')
         }

         if(data?.skills.length > 10){
            throw new Error('skill should not be more than 10')
         }
       const users =  await User.findByIdAndUpdate({_id:userId}, data)
       runValidators:true,
    
       res.send('data update successfully')
     }
     catch(err){
        res.status(400).send('something went wrong')
     }
   })

 
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

