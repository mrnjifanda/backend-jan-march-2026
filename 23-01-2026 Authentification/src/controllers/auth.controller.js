const { generateOTP } = require('../../utils/helpers/text.helper');
const { hash, compare } = require('../../utils/libs/bcrypt.lib');
const { sign } = require('../../utils/libs/jwt.lib');
const { sendMail } = require('../../utils/libs/mail.lib');

const User = require('../models/User');

const register = async (req, res) => {
    try {
        const data = req.body;
        const email = data.email.toLowerCase();
        const find = await User.findOne({ email });
        if (find) {
            return res.status(404).json({
                message: "Email already exist !!!"
            });
        }
        
        const password = await hash(data.password);
        const otp = generateOTP(6, 'numeric');
        const newUser = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: email,
            password: password,
            otp_code: otp
        }

        await User.create({ ...data, password, otp_code: otp });
        const send = await sendMail(email, 'Verify your email', `Your OTP code is: ${otp}`);
        if (!send) {
            return res.status(400).json({
                message: "Failed to send verification email !!!"
            });
        }

        return res.status(201).json({
            message: "User registered successfully, please verify your mailbox !!!"
        });
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({
            message: "Internal Server Error, please retry later !!!"
        });
    }
};

const verifyOTP = async (req, res) => {
    const { email, otp_code } = req.body;
    try {

        const user = await User.findOne({ email: email.toLowerCase() })
                               .select('otp_code verified');
        if (!user) {
            return res.status(404).json({
                message: "User not found !!!"
            });
        }

        if (user.verified) {
            return res.status(400).json({
                message: "User already verified !!!"
            });
        }
        
        if (user.otp_code !== otp_code) {
            return res.status(400).json({
                message: "Invalid OTP code !!!"
            });
        }

        user.otp_code = null;
        user.verified = new Date();
        await user.save();

        return res.json({
            message: "Email verified successfully !!!"
        });
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({
            message: "Internal Server Error, please retry later !!!"
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() })
                               .select('_id password');
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials !!!"
            })
        }

        const verify = await compare(password, user.password);
        if (verify) {
            const token = sign({ id: user._id });
            return res.json({
                message: "User login successfully !!!",
                data: { token }
            });
        }

        return res.status(400).json({
            message: "Invalid credentials !!!"
        });
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({
            message: "Internal Server Error, please retry later !!!"
        });
    }
};

const me = (req, res) => {
    return res.json({
        message: "User profile fetched successfully !!!",
        data: req.user
    });
};

module.exports = { register, verifyOTP, login, me };
