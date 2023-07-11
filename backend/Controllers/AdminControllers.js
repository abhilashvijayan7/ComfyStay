/* eslint-disable no-undef */
const userPropertyModel = require('../Models/UserPropertyModel');

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

module.exports.propertylist = async (req, res) => {
    try {
  
        const list = await userPropertyModel.find({});
        if (!list || list.length === 0) {
            res.json({ status: false, message: 'No property found' });
        } else{
            res.json({ status: true, homelist: list });
  
        }
    } catch (error) {
        res.json({ status: false, message: error.message });
    }
};
module.exports.updatePropertyStatus = async (req, res) => {
    try {
        const propertyId = req.params.id;
        const { status } = req.body;

        // Update the property status in the database
        await userPropertyModel.findByIdAndUpdate(propertyId, { status });

        res.json({ status: true, message: 'Property status updated successfully.' });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Failed to update property status.' });
    }
};