const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect(
    "mongodb+srv://sohaildev:sohailnodedev@sohailnode.4cxcj.mongodb.net/devTinder");
};

module.exports= connectDB