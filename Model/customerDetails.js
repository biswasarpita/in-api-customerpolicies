const mongoose = require('mongoose');

const customer = new mongoose.Schema ({
    mdmid: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    middleName: {
        type: String,
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    contactNumber: {
        type: Number,
        required: true,
        trim: true
    },
    dateOfBirth: {
        day: {
            type:Number,
            required: true
        },
        month: {
            type:Number,
            required:true
        },
        year: {
            type:Number,
            required:true
        }
    },
    gender: {
        type: String,
        enum: ['Female', 'Male']
    },
    maritlStatus: {
        type: String,
        enum: ['Single', 'Married']
    },
    address: {
        houseNumber: {
            type: String,
        },
        street: {
            type: String
        },
        city: {
            type: String
        },
        pincode: {
            type: Number
        },
        stete: {
            type: String
        }
    },
    policyNumber: [{
        policyId: {
            type: Number,
        }}
    ],
    dependent: [{
        name: {
            type: String,
            lowercase: true,
            trim: true
        },
        relationship: {
            type: String,
            enum: ['Father', 'Mother','Spouse','Child']
        }
    }],
    createdBy: {
        type: String,
        lowercase: true,
        trim: true
    },
    updatedBy: {
        type: String,
        lowercase: true,
        trim: true
    },

},{
    toObject: {
        virtuals: true
    },
    timestamps: true,
});

customer.virtual('customerId').get(function getMongoID() {
    return this._id;
});

module.exports = mongoose.model('customerDetails', customer);

