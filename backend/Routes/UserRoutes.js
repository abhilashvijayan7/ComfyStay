/* eslint-disable no-undef */
const router = require('express').Router();
const {register}=require('../Controllers/UserControllers');
const {verifyOtp}=require('../Controllers/UserControllers');

router.post('/register',register);
router.post('/verifyotp',verifyOtp);

module.exports = router;