/* eslint-disable no-undef */

const admin = require('../Models/AdminModel');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRETE_KEY, {
        expiresIn: maxAge
    });
};

module.exports.adminLogin= async(req,res)=>{
    const {email,password}=req.body;
    try{
        const newAdmin = await admin.findOne ({email:email});
        if(newAdmin){
            const auth = await bcrypt.compare(password,newAdmin.password);
            if(auth){
                const token=await createToken(newAdmin.id);
                res.json({message:'Admin login successful',token,status:true});
            }else{
                res.json({message:'Incorrect Password',status:false});
            }
        }else{
            res.json({message:'Admin not Found.Please check your email'});
        }
    }catch(error){
        console.log(error);
        res.json({ status: false, message: error.message });
    }
};