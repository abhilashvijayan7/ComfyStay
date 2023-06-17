/* eslint-disable no-undef */
const router = require('express').Router();
const {register}=require('../Controllers/UserControllers');
const {verifyOtp,login}=require('../Controllers/UserControllers');

router.post('/register',register);
router.post('/verifyotp',verifyOtp);
router.post('/login',login);

module.exports = router;