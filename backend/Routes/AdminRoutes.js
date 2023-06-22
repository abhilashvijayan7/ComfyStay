/* eslint-disable no-undef */
/* eslint-disable semi */
const {adminLogin} = require ('../Controllers/AdminControllers');
const router = require('express').Router();

router.post('/login',adminLogin)
module.exports = router;