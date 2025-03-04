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

