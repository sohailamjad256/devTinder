const express =  require("express")

const app = express()

app.get('/getUser',(req,res)=>{

    try{
        throw new Error('dfdsa')
    }
    catch(err){
        res.status(500).send('some error')
    }
 
});


app.use("/",(err, req,res,next)=>{
    if(err){
        res.status(500).send('something went wrong')
    }
})
    

app.listen(3000)

