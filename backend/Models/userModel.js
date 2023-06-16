/* eslint-disable no-undef */
const mongoose = require ('mongoose');

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
        required:true,
        index:{unique:true}
    },
    password:{
        type:String,
        require :true
    },
    verified:{
        type:Boolean,
        default:false
    },
    blockStatus:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('user',userSchema);