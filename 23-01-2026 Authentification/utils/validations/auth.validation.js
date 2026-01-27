const { z } = require('zod');
const Validation = require('./index');

const loginValidation = (req, res, next) => {

    const schema = z.object({
        email: z.email("Invalid email"),
        password: z.string().min(8, "Invalid password")
    });

    const valid = Validation(schema);
    if (valid.isValid) {
        req.body = valid.data;
        next();
    } else {
        return res.status(400).json(valid.error);
    }
};

const registerValidation = (req, res, next) => {

    const schema = z.object({
        first_name: z.string().min(3).max(50),
        last_name: z.string().min(3).max(50),
        email: z.email("Invalid email"),
        password: z.string().min(8, "Invalid password"),
        confirm_password: z.object().min(8, "Invalid password")
    }).refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"]
    });

    const valid = Validation(schema);
    if (valid.isValid) {
        req.body = valid.data;
        next();
    } else {
        return res.status(400).json(valid.error);
    }
};

module.exports = { loginValidation, registerValidation }
