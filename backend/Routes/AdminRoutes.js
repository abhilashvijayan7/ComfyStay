/* eslint-disable no-undef */
/* eslint-disable semi */
const {adminLogin,propertylist,updatePropertyStatus,completeOrder,getBookingDetails,fetchDashboardDetails} = require ('../Controllers/AdminControllers');
const router = require('express').Router();
const adminAuth =require('../Middlewares/adminAuth');

router.post('/login',adminLogin)
router.get('/propertylist',adminAuth,propertylist);
router.put('/properties/:id/status', adminAuth, updatePropertyStatus);
router.get('/bookingdetails', adminAuth, getBookingDetails);
router.post('/completeorder/:id', adminAuth, completeOrder);

router.get('/dashboardDetails', adminAuth, fetchDashboardDetails);





module.exports = router;