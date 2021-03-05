const Mongoose = require('mongoose');


module.exports = Mongoose.model('User', new Mongoose.Schema({
    ssn: {type: Number, required: true, unique: true, max: 11, min: 11},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true, min: 0},
    address: {type: String, required: false},
    phoneNum: {type: String, required: false}

}, {
    toJSON: {
        getters: true,
        virtuals: false,
    },
}));