/* eslint-disable no-undef */
const router = require('express').Router();
const {register, forgotpassword, resentotp,resentotpsignup}=require('../Controllers/UserControllers');
const {verifyOtp,login,verifyotpforgot,newpassword,propertysubmit,propertylist,homePropertylist,viewProperty}=require('../Controllers/UserControllers');
const userAuth =require('../Middlewares/userAuth');
const {uploadImage} = require('../Middlewares/multer');



router.post('/register',register);
router.post('/verifyotp',verifyOtp);
router.post('/login',login);
router.post('/forgotpassword',forgotpassword);
router.post('/verifyotpforgot',verifyotpforgot);
router.post('/newpassword',newpassword);
router.post('/resentotp',resentotp);
router.post('/resentotpsignup',resentotpsignup);
router.post('/propertysubmit',userAuth,uploadImage('./public/images/addproperty'),propertysubmit);
router.get('/propertylist',userAuth,propertylist);
router.get('/homepropertylist',userAuth,homePropertylist);
router.get('/viewproperty/:id', viewProperty);



module.exports = router;