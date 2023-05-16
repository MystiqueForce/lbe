const { default: mongoose } = require('mongoose');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const myTutorSchema = new mongoose.Schema( {
    name: {
    type: String,
    
    },

    email: {
    type: String,
    required: true
    },

    phone: {
    type: Number,
    
    },
    age: {
        type: Number
        
    }
})




const MyTutors = mongoose.model('MyTutors', myTutorSchema);
module.exports = MyTutors;
