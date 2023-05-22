const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:['true','username is required']
    },
    email: {
        type: String,
        required:['true','Email is required']
    },
    password: {
        type: String,
        required:[true,'Password is required']
    },
    blog: {
        type: mongoose.Types.ObjectId,
        ref:'Blog',
    }

}, {
    timestamps:true
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;