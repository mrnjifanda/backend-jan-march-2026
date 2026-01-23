require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const authController = require('./src/controllers/auth.controller');

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        const PORT = process.env.PORT;
        const app = express();
        app.use(express.json());

        app.post('/register', authController.register);
        app.post('/login', authController.login);
        app.get('/me', authController.me);

        app.listen(PORT, () => {
            console.log("http://localhost:" + PORT);
        });
    }).catch(error => {
        console.error("Database connection: ", error);
    });