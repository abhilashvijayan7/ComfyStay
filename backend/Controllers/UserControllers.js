/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable no-empty */
/* eslint-disable no-undef */
const user = require('../Models/userModel');
const serviceID = process.env.TWILIO_SERVICE_ID;
const accountSID = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const bcrypt = require('bcrypt');
const crypto = require('crypto');
const razorPay = require('razorpay');

const client = require('twilio')(accountSID, authToken);
const maxAge = 3 * 24 * 60 * 60;
const jwt = require('jsonwebtoken');
const bookingModel = require('../Models/BookingModel');


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
    const userId = req.user._id;

    const skip = (req.query.page - 1) * req.query.limit;
    const limit = parseInt(req.query.limit);
    const totalCount = await userPropertyModel.find({ userId: userId }).countDocuments({});
    const totalPages = Math.ceil(totalCount / limit);
    const list = await userPropertyModel.find({ userId: userId }).skip(skip).limit(limit);
    const completed = await bookingModel.find({$and:[{user_id: userId} ,{completed:true}]});
    console.log('kannaa completeed ',completed);


    if (!list || list.length === 0) {
      res.json({ status: false, message: 'No property found' });
    } else {
      res.json({ status: true, homelist: list, totalCount, totalPages });

    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

module.exports.homePropertylist = async (req, res) => {
  try {


    // eslint-disable-next-line quotes
    const skip = (req.query.page - 1) * req.query.limit;
    const limit = parseInt(req.query.limit);
    const totalCount = await userPropertyModel.find({ status: 'approved' }).countDocuments({});
    const totalPages = Math.ceil(totalCount / limit);

    const list = await userPropertyModel.find({ status: 'approved' }).skip(skip).limit(limit);
    if (!list || list.length === 0) {
      res.json({ status: false, message: 'No property found' });
    } else {
      res.json({ status: true, approvedlist: list, totalCount, totalPages });

    }
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

module.exports.viewProperty = async (req, res) => {
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

module.exports.bookAProperty = (req, res) => {

  try {
    const fromDate = new Date(req.body.fromDate);
    const toDate = new Date(req.body.toDate);
    const currentDate = new Date();
    const timeDiff = Math.abs(fromDate.getTime() - currentDate.getTime());
    const dayFromCurrent = Math.ceil(timeDiff / (1000 * 3600 * 24));


    if (dayFromCurrent > 3) {
      return res.json({ status: false, message: 'You can only book before 3 days' });
    } else if (toDate.getTime() <= currentDate.getTime() || toDate.getTime() < fromDate.getTime()) {
      return res.json({ status: false, message: 'Please select a future date for the end of the booking' });
    } else if (fromDate.getTime() === toDate.getTime()) {
      return res.json({ status: false, message: 'The booking should be for at least one day' });

    }
    else {

      req.session.bookingDetails = req.body;
      req.session.propertyId = req.params.id;

      console.log(req.body);

      return res.json({ status: true });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.paymentPage = async (req, res, next) => {


  try {
    const bookingDeatails = req.session.bookingDetails;


    const fromDate = new Date(bookingDeatails.fromDate);
    const toDate = new Date(bookingDeatails.toDate);
    const timeDiff = Math.abs(toDate.getTime() - fromDate.getTime());
    const numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const propertyId = req.session.propertyId;
    const property = await userPropertyModel.findOne({ _id: propertyId });
    let totalAmount;
    if (property) {

      totalAmount = numberOfDays * property.homeprice;

      res.json({ status: true, bookingDeatails, property, totalAmount, numberOfDays });
    } else {
      res.json({ status: false });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.orders = async (req, res, next) => {

  try {
    const instance = new razorPay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRETE_KEY_ID,
    });

    const options = {
      amount: req.body.amount * 100,
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
    };

    instance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ status: false, message: 'Something went wrong' });
      }
      // Handle successful order creation
      return res.json({ status: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: 'Server Error' });
  }
};


module.exports.verify = async (req, res, next) => {
  const amount = (req.body.amount) / 100;
  const propertyId = req.body.propertyid;


  const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRETE_KEY_ID)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {

      const newOrder = new bookingModel({
        user_id: req.user._id,
        property_id: req.body.propertyid,
        booked_At: date,
        fromDate: req.body.fromDate,
        toDate: req.body.toDate,
        payment_id: req.body.razorpay_payment_id,
        amount: req.body.amount,
      });

      const order = await newOrder.save();
      const orderId = order._id;
      await userPropertyModel.findOneAndUpdate({ _id: req.body.propertyid }, { $set: { bookedstatus: true } });
      req.session.bookingDetails = null;
      req.session.propertyId = null;
      res.json({ status: true, message: 'Payment successfull', orderId });
    } else {
      res.json({ status: false, message: 'Invalid signature sent!' });
    }

  } catch (error) {
    console.log(error);
    res.json({ status: false, message: 'Internal Server Error!' });
  }
};

module.exports.getOrderDetails = async (req, res, next) => {

  try {
    const orderId = req.params.id;
    const order = await bookingModel
      .findOne({ _id: orderId })
      .populate('user_id')
      .populate({ path: 'property_id', populate: { path: 'userId' } });

    if (order) {
      res.json({ status: true, order });
    } else {
      res.json({ status: false, message: 'Something went wrong' });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: 'Internal server Error' });
  }
};

module.exports.getBookingDetails = async (req, res, next) => {
  try {

    const id = req.user._id;
    const bookings = await bookingModel.find({ user_id: id }).populate('property_id').sort({ _id: -1 });

    if (bookings) {
      if (bookings.length > 0) {
        res.json({ status: true, bookings });
      } else {
        res.json({ status: false });
      }
    } else {
      res.json({ status: false, message: 'Something Went Wrong' });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: 'Internal Server Error' });
  }
};

module.exports.cancelOrder = async (req, res, next) => {
  try {
    const bookingId = req.params.id;
    const cancelledBooking = await bookingModel.findOneAndUpdate({ _id: bookingId }, { $set: { cancelStatus: true } }).populate('property_id');
    const property_id = cancelledBooking.property_id._id;
    await userPropertyModel.findOneAndUpdate({ _id: property_id }, { $set: { bookedstatus: false } });
    res.json({ status: true, message: 'Booking Cancelled!!', cancelledBooking });
  } catch (error) {
    console.log(error);
  }
};