/* eslint-disable no-undef */
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    host_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    property_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AddProperty',
        required: true,
    },
    booked_At: {
        type: String,
        required: true
    },
    
   
    fromDate: {
        type: String,
        required: true
    },
    toDate: {
        type: String,
        required: true
    },
   
    payment_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
   
    cancelStatus: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = new mongoose.model('booking', bookingSchema);