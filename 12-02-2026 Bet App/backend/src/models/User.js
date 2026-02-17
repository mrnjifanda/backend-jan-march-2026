const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    fullName: {
        type: String,
        min: 4,
        max: 50,
        trim: true,
        required: true
    },
    email: {
        type: String,
        min: 4,
        max: 50,
        trim: true,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        min: 8,
        max: 20,
        trim: true,
        unique: true,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        min: 8,
        max: 50,
        trim: true,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, { timestamps: true });

const User = model('users', userSchema);

module.exports = User;