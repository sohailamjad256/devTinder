const express =  require("express")

const app = express()

const {adminAuth, userAuth} = require('./middlewares/auth')
//handling auth middle ware for all GET, Post,... requests
app.use('/admin',adminAuth)

app.get('/user',userAuth, (req,res)=>{
    res.send('check user data')
})

app.post('/login/user',(req,res)=>{
    res.send('User logged in successfully')
})

app.get('/admin/getUserData',(req,res)=>{
    res.send('data is sent')
});

app.get('/admin/delete',(req,res)=>{
    res.send('delete a user')
})



app.listen(3000, ()=>{
    console.log('server is listening on 3000');
    
})