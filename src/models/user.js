const mongoose =require('mongoose');
const validator = require("validator")

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        minLength:4,
        maxLength:50
    },
    lastName:{
        type:String,

    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
               throw new Error("Not valid Email" + value)
            }
        },
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Not strong  password" + value)
            }
        }
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!['male','female','others'].includes(value)){
                throw new Error
            }
        },
    },
    about:{
        type:String,
        default:'This is a software developer page'
    },
    photoUrl:{
        type:String,
        default:'',
        validate(value){
        //  if(!validator.isURL(value)){
        //     throw new Error
        //  }
        }
    },
    skills:[String]
},
{
    timestamps:true
}
)

const User = mongoose.model("User", userSchema)

module.exports = User