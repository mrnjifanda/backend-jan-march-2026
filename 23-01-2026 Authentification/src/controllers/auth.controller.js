const { hash, compare } = require('../../utils/libs/bcrypt.lib');
const { sign } = require('../../utils/libs/jwt.lib');

const User = require('../models/User');

const register = async (req, res) => {
    try {
        const data = req.body;
        const email = data.email.toLowercase();
        const find = await User.findOne({ email });
        if (find) {
            return res.status(404).json({
                message: "Email already exist !!!"
            });
        }
        
        const password = await hash(data.password);
        await User.create({ ...data, password });
        
        return res.status(201).json({
            message: "User registered successfully !!!"
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
        const user = await User.findOne({ email: email.toLowercase() });
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

const me = (req, res) => { };

module.exports = { register, login, me };
