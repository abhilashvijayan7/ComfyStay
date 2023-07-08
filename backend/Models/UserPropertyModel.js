/* eslint-disable no-undef */
const mongoose = require ('mongoose');

const addPropertySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hometype: {
        type: String,
        required: true
    },
    propertynumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    guests: {
        type: String,
        required: true
    },
    bedrooms: {
        type: String,
        required: true
    },
    beds: {
        type: String,
        required: true
    },
    bathrooms: {
        type: String,
        required: true
    },
    wifi: {
        type: Boolean
        
    },
    tv: {
        type: Boolean
      
    },
    kitchen: {
        type: Boolean
        
    },
    washingmachine: {
        type: Boolean
       
    },
    freeparking: {
        type: Boolean
        
    },
    paidparking: {
        type: Boolean
       
    },
    airconditioning: {
        type: Boolean
        
    },
    dedicatedworkspace: {
        type: Boolean
        
    },
    homephoto: {
        type: String,
        required: true
    },
    homeprice: {
        type: String,
        required: true
    }
     
});

module.exports  = mongoose.model('AddProperty', addPropertySchema);


