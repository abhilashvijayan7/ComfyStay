/* eslint-disable no-undef */
const router = require('express').Router();
const {register, forgotpassword}=require('../Controllers/UserControllers');
const {verifyOtp,login,verifyotpforgot,newpassword}=require('../Controllers/UserControllers');

router.post('/register',register);
router.post('/verifyotp',verifyOtp);
router.post('/login',login);
router.post('/forgotpassword',forgotpassword);
router.post('/verifyotpforgot',verifyotpforgot);
router.post('/newpassword',newpassword);

module.exports = router;