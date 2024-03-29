/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const userPropertyModel = require('../Models/UserPropertyModel');
const bookingModel =require ('../Models/BookingModel');
const userModel = require('../Models/userModel');

const admin = require('../Models/AdminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRETE_KEY, {
        expiresIn: maxAge
    });
};

module.exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const newAdmin = await admin.findOne({ email: email });
        if (newAdmin) {
            const auth = await bcrypt.compare(password, newAdmin.password);
            if (auth) {
                const token = await createToken(newAdmin.id);
                res.json({ message: 'Admin login successful', token, status: true });
            } else {
                res.json({ message: 'Incorrect Password', status: false });
            }
        } else {
            res.json({ message: 'Admin not Found.Please check your email', status: false });
        }
    } catch (error) {
        console.log(error);
        res.json({ status: false, message: error.message });
    }
};


// module.exports.updatePropertyStatus = async (req, res) => {
//     try {
//         const propertyId = req.params.id;
//         const { status } = req.body;

//         // Update the property status in the database
//         await userPropertyModel.findByIdAndUpdate(propertyId, { status });

//         res.json({ status: true, message: 'Property status updated successfully.' });
//     } catch (error) {
//         res.status(500).json({ status: false, message: 'Failed to update property status.' });
//     }
// };


const nodemailer = require('nodemailer');
// eslint-disable-next-line no-unused-vars
const User = require('../Models/userModel');


module.exports.updatePropertyStatus = async (req, res) => {
    try {
        const propertyId = req.params.id;
        const { status } = req.body;

        // Update the property status in the database
        await userPropertyModel.findByIdAndUpdate(propertyId, { status });

        // Get the user details associated with the property
        const property = await userPropertyModel.findById(propertyId).populate('userId');
        const user = property.userId;

        // Send an email to the user
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Replace with your email service provider's SMTP server
            port: 587, // Replace with the appropriate port number
            secure: false, // Set to true if using a secure connection (TLS/SSL)
            auth: {
                user: process.env.NODEMAILER_USER, // Replace with your email address
                pass: process.env.NODEMAILER_PASS, // Replace with your email password
            },
        });

        const mailOptions = {
            from:  process.env.NODEMAILER_USER, // Replace with the sender's email address
            to: user.email, // Use the user's email address
            subject: 'Property Status Update',
            text: `Dear ${user.username},\n\nYour property status has been updated to ${status} by the admin.\n\nRegards,\nThe Admin`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent successfully:', info.response);
            }
        });

        res.json({ status: true, message: 'Property status updated successfully.' });
    } catch (error) {
        console.error('Failed to update property status:', error);
        res.status(500).json({ status: false, message: 'Failed to update property status.' });
    }
};

module.exports.propertylist = async (req, res) => {
    try {
  
        // const list = await userPropertyModel.find({});
        // if (!list || list.length === 0) {
        //     res.json({ status: false, message: 'No property found' });
        // } else{
        //     res.json({ status: true, homelist: list });
  
        // }
        const skip = (req.query.page - 1) * req.query.limit;
        const limit = parseInt(req.query.limit);
        const totalCount = await userPropertyModel.countDocuments({});
        const totalPages = Math.ceil(totalCount / limit);
        const list = await userPropertyModel.find({}).populate({ path: 'userId', select: 'username' }).sort({ _id: -1 }).skip(skip).limit(limit);

        if (!list || list.length === 0) {
            res.json({ status: false, message: 'No property found' });

        } else{
            res.json({ status: true, homelist: list , totalCount, totalPages });
      
        }

    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};


module.exports.getBookingDetails = async (req, res, next) => {
    try {
  
        const id = req.admin._id;

        const skip = (req.query.page - 1) * req.query.limit;
        const limit = parseInt(req.query.limit);
        const totalCount = await bookingModel.countDocuments({});
        const totalPages = Math.ceil(totalCount / limit);
        const bookings = await bookingModel.find().populate('property_id').populate('user_id').populate('host_id').sort({ _id: -1 }).skip(skip).limit(limit);
        if (bookings) {
            if (bookings.length > 0) {
                res.json({ status: true, bookings, totalCount, totalPages });
            } else {
                res.json({ status: false , message:'No Booking'});
            }
        } else {
            res.json({ status: false, message: 'Something Went Wrong' });
        }
    } catch (error) {
        console.log(error);
        res.json({ status: false, message: 'Internal Server Error' });
    }
};
  
module.exports.completeOrder = async (req, res, next) => {
    try {
        const bookingId = req.params.id;
        const completedBooking = await bookingModel.findOneAndUpdate({ _id: bookingId }, { $set: { completed: true } }).populate('property_id');
        const property_id = completedBooking.property_id._id;
        await userPropertyModel.findOneAndUpdate({ _id: property_id }, { $set: { bookedstatus: false } });
        res.json({ status: true, message: 'Booking completed!!', completedBooking });
    } catch (error) {
        console.log(error);
    }
};


module.exports.fetchDashboardDetails = async (req, res, next) => {
    try {
        // Fetch revenue details for the last 7 days
        const revenueDetails = await bookingModel.aggregate([
            {
                $match: {
                    cancelStatus:false,
                },
            },
            {
                $group: {
                    _id: { $dayOfWeek: { $toDate: '$booked_At' } },
                    total: { $sum: '$amount' },
                },
            },
            {
                $sort: { _id: 1 },
            },
        ]);
  
  

        const bookingDetails = await bookingModel.aggregate([
            {
                $group: {
                    _id: {
                        $cond: [
                            { $and: [{ $eq: ['$completed', true] }, { $eq: ['$cancelStatus', false] }] }, // Check if booking is completed and not cancelled
                            'completed',
                            {
                                $cond: [
                                    { $and: [{ $eq: ['$completed', false] }, { $eq: ['$cancelStatus', true] }] }, // Check if booking is not completed and cancelled
                                    'cancelled',
                                    'active', // Booking is neither completed nor cancelled (active)
                                ],
                            },
                        ],
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 1,
                    count: 1,
                },
            },
        ]);
  
        // Additional aggregation stages to get count for other status like 'active' and 'cancelled'
        // ...
  
        // Fetch total users count
        const totalUsers = await userModel.countDocuments();
        totalBookings=await bookingModel.countDocuments();
  
        // Calculate total revenue and total completed bookings
        const totalRevenue = revenueDetails.reduce((acc, item) => acc + item.total, 0);
        // const totalCompletedBookings = bookingDetails.find((item) => item._id === 'completed')?.count || 0;
  
        // Construct the final data object to be sent to the frontend
        const data = {
            revenueDetails,
            bookingDetails,
            total: {
                totalRevenue,
                totalBookings,
                totalUsers,
            },
        };
  
        res.json(data);
  
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};