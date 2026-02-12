const { Schema, model } = require('mongoose');
const { required } = require('zod/mini');

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        min: [3, "Please enter valid name ( > 3)"],
        max: [50, "Please enter valid name ( < 50)"],
    },
    last_name: {
        type: String,
        required: true,
        min: [3, "Please enter valid name ( > 3)"],
        max: [50, "Please enter valid name ( < 50)"],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        min: [3, "Please enter valid name ( > 3)"],
        max: [50, "Please enter valid name ( < 50)"],
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: [8, "Please enter valid name ( > 8)"],
    },
    otp_code: {
        type: String,
        required: false,
        default: null,
    },
    verified: {
        type: Date,
        required: false,
        default: null,
    },
}, { timestamps: true });

const User = model('user', userSchema);

module.exports = User;
