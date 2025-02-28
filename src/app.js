const express =  require("express")

const app = express()

// app.use('/users', (req,res)=>{
//     res.send("Hahaha")
// })

app.get('/users',(req,res)=>{
    res.send({firstname:"Sohail", lastname:"amjad"})
})

app.delete('/users', (req,res)=>{
    res.send('deleted Data')
})

app.patch('/users',(req,res)=>{
    res.send('data patched')
})
// This will only match with only particular http method
app.post('/users',(req,res)=>{
    res.send("data saved successfully")
})
//this will match all th HTTP method Api calls to /hello
app.use("/hello", (req,res)=>{
    res.send("Hello 3000")
})




app.listen(3000)