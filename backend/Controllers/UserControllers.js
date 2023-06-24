/* eslint-disable indent */
/* eslint-disable no-empty */
/* eslint-disable no-undef */
const user = require('../Models/userModel');
const serviceID = process.env.TWILIO_SERVICE_ID;
const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const bcrypt = require('bcrypt');

const client = require('twilio')(accountSID, authToken);
const maxAge = 3 * 24 * 60 * 60;
const jwt = require('jsonwebtoken');
let newUser;
// eslint-disable-next-line no-unused-vars
let forgotUserId;
let forgotUser;
// eslint-disable-next-line no-unused-vars
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRETE_KEY, {
    expiresIn: maxAge
  });
};
function hashPassword(password) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
}

module.exports.register = async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { username, phonenumber, email, password, cpassword } = req.body;

  try {
    const phoneExist = await user.findOne({ phonenumber: phonenumber });
    if (phoneExist) {
      res.json({ message: 'This phonenumber already exist', status: false });
    } else {
      const emailExist = await user.findOne({ email: email });
      if (emailExist) {
        res.json({ message: 'This email already exist', status: false });
      } else {
        newUser = req.body;
        client.verify.v2.services(serviceID)
          .verifications.create({ to: `+91${phonenumber}`, channel: 'sms' });
        res.json({ status: true });
      }
    }
  } catch (error) {

  }
};
module.exports.verifyOtp = (req, res) => {
  const otpCode = req.body.otp;
  // if(!phonenumber){
  //     return res.json({ status: true, message: 'invalid verification'});
  // }
  client.verify.v2.services(serviceID)
    .verificationChecks.create({ to: `+91${newUser.phonenumber}`, code: otpCode })
    .then(async (verification_check) => {
      if (verification_check.status === 'pending') {
        res.json({ status: false, message: 'The enterd OTP is invalid' });
      }
      if (verification_check.status === 'approved') {
        const newMember = new user({
          username: newUser.username,
          email: newUser.email,
          phonenumber: newUser.phonenumber,
          password: hashPassword(newUser.password),
          verified: true
        });
        // eslint-disable-next-line no-unused-vars
        const userdetails = await newMember.save();
        res.json({ status: true, message: 'Registered successfuly' });

      }
      if (verification_check.status === 429) {
        res.json({ status: false, message: ' Max check attempts reached' });
      }
    });
};

// eslint-disable-next-line no-unused-vars
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const customer = await user.findOne({ email });
    if (customer) {
      const auth = await bcrypt.compare(password, customer.password);
      if (auth) {
        const token = createToken(customer._id);

        res.status(200).json({ user: customer, status: true, token });
      } else {
        res.status(401).json({ message: 'Incorrect password', status: false });
      }
    } else {
      res.status(401).json({ message: 'Incorrect Email', status: false });

    }
  } catch (error) {

  }
};

module.exports.forgotpassword = async (req, res) => {
  const { phonenumber } = req.body;
  try {
    const phoneExist = await user.findOne({ phonenumber: phonenumber });
    if (phoneExist) {
      forgotUserId = phoneExist._id;
      forgotUser = req.body;

      client.verify.v2.services(serviceID)
        .verifications.create({ to: `+91${phonenumber}`, channel: 'sms' });
      res.json({ status: true });
    } else {
      res.json({ message: 'This phonenumber entered is incorrect', status: false });

    }
  } catch (error) {

  }
};



module.exports.verifyotpforgot = (req, res) => {
  const otpCode = req.body.otp;
  console.log(otpCode);
  // if(!phonenumber){
  //     return res.json({ status: true, message: 'invalid verification'});
  // }
  client.verify.v2.services(serviceID)
    .verificationChecks.create({ to: `+91${forgotUser.phonenumber}`, code: otpCode })
    .then(async (verification_check) => {
      if (verification_check.status === 'pending') {
        res.json({ status: false, message: 'The enterd OTP is invalid' });
      }
      if (verification_check.status === 'approved') {

        res.json({ status: true, message: 'authentication success.' });

      }
      if (verification_check.status === 429) {
        res.json({ status: false, message: ' Max check attempts reached' });
      }
    });
};
module.exports.newpassword = async (req, res) => {
  try {
    const newpassword = hashPassword(req.body.password);
    const result = await user.findOneAndUpdate({ _id: forgotUserId }, { $set: { password: newpassword } });
    if (result) {
      res.json({ status: true, message: 'password updated successfuly' });
    } else {
      res.json({ status: false, message: 'unable to updated password' });
    }
  } catch (error) {

  }
};