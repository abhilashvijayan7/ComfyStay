/* eslint-disable no-empty */
/* eslint-disable no-undef */
const user = require('../Models/userModel');
const serviceID = process.env.TWILIO_SERVICE_ID;
const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSID, authToken);
let newUser;
module.exports.register = async (req, res) => {
    // eslint-disable-next-line no-unused-vars
    const { username, phonenumber, email, password, cpassword } = req.body;

    try {
        const phoneExist = await user.findOne({ phonenumber:phonenumber });
        if (phoneExist) {
            res.json({ message: 'This phonenumber already exist', status: false });
        } else {
            const emailExist = await user.findOne({ email:email });
            if (emailExist) {
                res.json({ message: 'This email already exist', status: false });
            } else {
                newUser = req.body;
                client.verify.v2.services(serviceID)
                    .verifications.create({ to: `+91${phonenumber}`, channel: 'sms' });
                res.json({status:true});
            }
        }
    }catch(error){

    }
};
module.exports.verifyOtp = (req,res)=>{
    const otpCode = req.body.otp;
    console.log(otpCode);
    // if(!phonenumber){
    //     return res.json({ status: true, message: 'invalid verification'});
    // }
    client.verify.v2.services(serviceID)
        .verificationChecks.create({ to: `+91${newUser.phonenumber}`, code: otpCode })
        .then(async (verification_check) => {
            if (verification_check.status === 'pending') {
                res.json({ status: false, message: 'The enterd OTP is invalid' });
            }
            if(verification_check.status === 'approved'){
                const newMember = new user({
                    username:newUser.username, 
                    email:newUser.email,  
                    phonenumber:newUser.phonenumber,
                    password:newUser.password,
                    verified:true
                });
                // eslint-disable-next-line no-unused-vars
                const userdetails = await newMember.save();
                res.json({ status: true, message: 'Your verification completed successfully'});

            }
            if (verification_check.status === 429) {
                res.json({ status: false, message: ' Max check attempts reached' });
            }
        });};