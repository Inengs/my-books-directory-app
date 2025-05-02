const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/schema').User; // Import User model
const router = express.Router();

// Hash password function
const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' })
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save()

        res.status(201).json({
            message: 'User registered successfully! '
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = router;