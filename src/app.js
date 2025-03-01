const express =  require("express")

const app = express()



app.use('/users',(req,res,next)=>{
    console.log('response from server');
    
    next()
    //res.send('from Server1')
},
(req,res,next)=>{
    console.log('response from server 2');

  //  res.send('from server 2')
    next()
    
},
(req,res,next)=>{
    console.log('response from server 3');
  //  res.send('from server 3')
    next()
    
},
(req,res,next)=>{
    console.log('response from server 4');
    res.send('from server 4')
    next()
    
}

);

// app.use('/users', (req,res)=>{
//     res.send("Hahaha")
// })


// app.get('/users', (req, res)=>{
//     console.log(req.query);
    
//     res.send({firstname:'sohail'})
// })


// app.get('/users/:userid/:name/:password',(req,res)=>{
//     console.log(req.params);
    
//     res.send({firstname:"Sohail", lastname:"amjad"})
// })

// app.delete('/users', (req,res)=>{
//     res.send('deleted Data')
// })

// app.patch('/users',(req,res)=>{
//     res.send('data patched')
// })
// // This will only match with only particular http method
// app.post('/users',(req,res)=>{
//     res.send("data saved successfully")
// })
// //this will match all th HTTP method Api calls to /hello
// app.use("/hello", (req,res)=>{
//     res.send("Hello 3000")
// })




app.listen(3000)