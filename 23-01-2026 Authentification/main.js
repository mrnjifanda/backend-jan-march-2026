require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');

// const swaggerDocument = require('./docs/swagger.doc');
const swaggerDocument = require('./docs/openapi.json');
const authController = require('./src/controllers/auth.controller');
const { loginValidation, registerValidation, otpValidation } = require('./utils/validations/auth.validation');
const { isLogin } = require('./utils/middlewares/auth.middleware');


mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        const PORT = process.env.PORT;
        const app = express();
        app.use(express.json());

        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        app.post('/register', registerValidation, authController.register);
        app.post('/register-otp', otpValidation, authController.verifyOTP);
        app.post('/login', loginValidation, authController.login);
        app.get('/me', isLogin, authController.me);

        app.listen(PORT, () => {
            const baseUrl = "http://localhost:" + PORT;
            console.log(`Server is running on ${baseUrl}`);
            console.log(`Swagger UI: ${baseUrl}/api-docs`);
        });
    }).catch(error => {
        console.error("Database connection: ", error);
    });