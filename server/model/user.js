const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    confirmpassword: String,
    image:String
});

exports.User = mongoose.model('user', userSchema);