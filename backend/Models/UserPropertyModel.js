/* eslint-disable no-undef */
const mongoose = require ('mongoose');

const addPropertySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status:{
        type:String,
        required:true,
        default:'pending'
    },
    hometype: {
        type: String,
        required: true
    },

    propertynumber:{
        type: String,
        required: true
    },

    address: {
        houseName:{
            type: String,
            required: true
        },
        city:{
            type: String,
            required: true
        },

        district:{
            type: String,
            required: true
        },

        state:{
            type: String,
            required: true
        }, 

        pincode:{
            type: String,
            required: true
        },
        phoneNumber:{
            type: String,
            required: true
        }
        
       
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
    },
    bookedstatus:{
        type:String,
        required:true,
        default:'false'
    }
     
});

module.exports  = mongoose.model('AddProperty', addPropertySchema);



