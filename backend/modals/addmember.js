const mongoose = require('mongoose');

const mongoschema = mongoose.Schema({
    name: {
        type: String,
       
    },
    number: {
        type: Number,
       
    },
    email: {
        type: String,
       
    },
    age: {
        type: Number,
       
    },
    experience: {
        type: String,
       
    },
    gender: {
        type: String,
       
    },
    position: {
        type: String,
       
    },
    salary: {
        type: Number,
        
    },
    pf: { 
        type: Number, 
      
    },
    incentive: { 
        type: Number, 
       
    },
    joiningDate: {
        type: Date,
        default: Date.now
    },
    address: {
        type: String,
       
    },
    password: {
        type: String,
       
    }
});

module.exports = mongoose.model('Admin', mongoschema);
