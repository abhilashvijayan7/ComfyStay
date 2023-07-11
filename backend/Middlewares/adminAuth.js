/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const adminModel= require('../Models/AdminModel');
 module.exports= async (req,res,next)=>{
   
    try{
        const authHeader=req.headers.authorization;

        const authToken =  authHeader.split(' ')[1];
   // if there is no tocken
   if(!authToken) return res.json({ loginfail: true, status: false, message: "no auth token" });

   //decording the token
   const decoded = jwt.verify(authToken,process.env.JWT_SECRETE_KEY);
   //checking whether the admin is exist or not
   const admin = await adminModel.findOne({_id:decoded.id});
   
   if(!admin) return res.json({loginfail:true,status:false,message:"Unauthorized"});
   req.admin = admin;
   next();
} catch (error) { 

   return res.json({loginfail:true,status:false,message:"Unauthorized"});
}
};