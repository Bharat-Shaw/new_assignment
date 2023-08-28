// authRoutes.js
const express = require('express');
const registerRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/User');


registerRouter.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email })
    if (user) {
        res.send('User Already exist');
    } else {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const new_user = new UserModel({ email, password: hashedPassword });
            await new_user.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(500).json({ error: 'An error occurred' });
        }
    }
});

registerRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, 'assignment');
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = { registerRouter };
