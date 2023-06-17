/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');

const userModel = require('../Models/userModel');

module.exports = async(req,res,next)=>{
    try {
        const authHeader =req.headers.authorization;
       
        const authToken = authHeader.split(' ')[1];
        // if there is no tocken
        if(!authToken) return res.json({ loginfail: true, status: false, message: 'no auth token' });

        //decording the token
        const decoded = jwt.verify(authToken,process.env.JWT_SECRETE_KEY);
        //checking whether the user is exist or not
        const user = await userModel.findOne({_id:decoded.id});
        if(!user) return res.json({loginfail:true,status:false,message:'Unauthorized'});
        req.user = user;
        next();
    } catch (error) { 
        return res.json({loginfail:true,status:false,message:'Unauthorized'});
    }
};