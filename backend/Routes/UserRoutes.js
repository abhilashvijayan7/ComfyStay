/* eslint-disable no-undef */
const router = require('express').Router();
const {register, forgotpassword, resentotp,resentotpsignup}=require('../Controllers/UserControllers');
const {verifyOtp,login,verifyotpforgot,newpassword,propertysubmit}=require('../Controllers/UserControllers');
const userAuth =require('../Middlewares/userAuth');
router.post('/register',register);
router.post('/verifyotp',verifyOtp);
router.post('/login',login);
router.post('/forgotpassword',forgotpassword);
router.post('/verifyotpforgot',verifyotpforgot);
router.post('/newpassword',newpassword);
router.post('/resentotp',resentotp);
router.post('/resentotpsignup',resentotpsignup);
router.post('/propertysubmit',userAuth,propertysubmit);


module.exports = router;