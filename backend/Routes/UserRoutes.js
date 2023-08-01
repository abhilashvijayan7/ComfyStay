/* eslint-disable quotes */
/* eslint-disable no-undef */
const router = require('express').Router();
const {register, forgotpassword, resentotp,resentotpsignup,paymentPage,orders,verify,getOrderDetails,getBookingDetails,cancelOrder,userHeader}=require('../Controllers/UserControllers');
const {verifyOtp,login,verifyotpforgot,newpassword,propertysubmit,propertylist,homePropertylist,viewProperty,bookAProperty,getDetails,updateUserDetails,changePassword}=require('../Controllers/UserControllers');
const userAuth =require('../Middlewares/userAuth');
const {uploadImage} = require('../Middlewares/multer');


router.get("/", userAuth, userHeader);

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
router.get('/homepropertylist',homePropertylist);
router.get('/viewproperty/:id', viewProperty);
router.post('/bookaproperty/:id',userAuth,bookAProperty);
router.get('/paymentdetails', userAuth, paymentPage);
router.post('/verifypayment', userAuth, verify);
router.post("/orders", userAuth, orders);
router.get('/getorderdetails/:id', userAuth, getOrderDetails);
router.get("/bookingdetails", userAuth, getBookingDetails);
router.post("/cancelorder/:id", userAuth, cancelOrder);

router.get("/getuserDetails", userAuth, getDetails);
router.post("/edituserDetails", userAuth, updateUserDetails);
router.post('/changepassword', userAuth, changePassword);



module.exports = router;