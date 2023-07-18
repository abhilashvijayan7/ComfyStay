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

const userPropertyModel = require('../Models/UserPropertyModel');
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
        console.log(`${newUser},aaaaaaaaa`);
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
module.exports.login = async (req, res) => {
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
module.exports.resentotp = (req, res) => {
  const { phonenumber } = forgotUser;
  client.verify.v2.services(serviceID)
    .verifications.create({ to: `+91${phonenumber}`, channel: 'sms' });
  res.json({ status: true, message: 'Otp resent success' });
};

module.exports.resentotpsignup = (req, res) => {
  console.log(newUser);
  client.verify.v2.services(serviceID)
    .verifications.create({ to: `+91${newUser.phonenumber}`, channel: 'sms' });
  res.json({ status: true, message: 'Otp resent success' });
};

module.exports.propertysubmit = async (req, res) => {
  console.log('print req.body', req.body);
  try {
    const exist = await userPropertyModel.findOne({ propertynumber: req.body.propertynumber }).lean();

    if (exist) {
      console.log('existtttttttttttt');
      res.json({ status: false, message: 'The property already exist' });
    } else {
      console.log('not existtttt');
      const imagePath = req.files.image[0].path;
      // eslint-disable-next-line quotes
      const modifiedImagePath = imagePath.replace(/^public[\\/]+/, "");
      // await new userPropertyModel({

      //   userId: req.user._id,
      //   hometype: req.body.hometype,
      //   propertynumber: req.body.propertynumber,
      //   address: req.body.address,
      //   guests: req.body.guests,
      //   bedrooms: req.body.bedrooms,
      //   beds: req.body.beds,
      //   bathrooms: req.body.bathrooms,
      //   wifi: req.body.wifi,
      //   tv: req.body.tv,
      //   kitchen: req.body.kitchen,
      //   washingmachine: req.body.washingmachine,
      //   freeparking: req.body.freeparking,
      //   paidparking: req.body.paidparking,
      //   airconditioning: req.body.airconditioning,
      //   dedicatedworkspace: req.body.dedicatedworkspace,
      //   homephoto: modifiedImagePath,
      //   homeprice: req.body.homeprice

      // }).save();



      await new userPropertyModel({
        userId: req.user._id,
        hometype: req.body.hometype,
        propertynumber: req.body.propertynumber,
        address: {
          houseName: req.body.houseName,
          city: req.body.city,
          district: req.body.district,
          state: req.body.state,
          pincode: req.body.pincode,
          phoneNumber: req.body.phoneNumber
        },
        guests: req.body.guests,
        bedrooms: req.body.bedrooms,
        beds: req.body.beds,
        bathrooms: req.body.bathrooms,
        wifi: req.body.wifi,
        tv: req.body.tv,
        kitchen: req.body.kitchen,
        washingmachine: req.body.washingmachine,
        freeparking: req.body.freeparking,
        paidparking: req.body.paidparking,
        airconditioning: req.body.airconditioning,
        dedicatedworkspace: req.body.dedicatedworkspace,
        homephoto: modifiedImagePath,
        homeprice: req.body.homeprice,
      
      }).save();
      



      res.json({ status: true, message: 'Property added successfuly' });

    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }

};

module.exports.propertylist = async (req, res) => {
  try {
    const  userId= req.user._id;
    console.log(userId,'useriddddddddddddddd');

    const list = await userPropertyModel.find({userId:userId});
    if (!list || list.length === 0) {
      res.json({ status: false, message: 'No property found' });
    } else{
      res.json({ status: true, homelist: list });

    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

module.exports.homePropertylist = async (req, res) => {
  try {
   

    // eslint-disable-next-line quotes
    const list = await userPropertyModel.find({status :"approved"});
    if (!list || list.length === 0) {
      res.json({ status: false, message: 'No property found' });
    } else{
      res.json({ status: true,approvedlist: list });

    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

module.exports.viewProperty = async(req,res)=>{
  try {
    const propertyId = req.params.id;
    const property = await userPropertyModel.findOne({ _id: propertyId });
    if (property) {
      res.json({ status: true, property });
    } else {
      res.json({ status: false, message: 'Something went wrong' });
    }
  } catch (error) {
    res.json({ status: false, message: error.message });
    console.log(error);
  }
};


