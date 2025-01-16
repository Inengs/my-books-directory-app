const express = require('express');
const login = express.Router(); // Create login route
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/schema').User; // Import User model

// Secret key for JWT (import from .env)
const JWT_SECRET = process.env.JWT_SECRET || 'YOUR SECRET KEY'

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // check for the user in the database
        const user = await User.findOne({ username });

        //if the user is invalid, return error message
        if (!user) {
            return res.status(400).json({ error: 'Invalid Username' });
        }

        // check if the password is valid by checking if it matches the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        // if the password is invalid, return error message
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid password' })
        }

        const token = jwt.sign(
            { id: user._id, username: user.username }, // payload or userinfo
            JWT_SECRET, // secret key
            { expiresIn: '1h' } // Expiration time of token
        )

        res.json({ token });

        res.redirect('/home');

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' }) // status code 500 is for internal server error
    }
});

router.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'html', 'login.html'));
})

module.exports = login;