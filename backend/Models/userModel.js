const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required : true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        require :true
    },
    verified:{
        type:Boolean,
        default:false
    }
})

module.exports=new mongoose.model("user",userSchema)