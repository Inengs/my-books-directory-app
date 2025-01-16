// import dependencies
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/schema');
const booksRouter = require('./routes/books');
const methodOverride = require('method-override')
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv').config();
const loginRouter = require('./routes/login');


// initialize app
const app = express();

app.use(express.urlencoded({ extended: true }));

// use method-override middleware
app.use(methodOverride('_method'));

// serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// initialize port
const port = 3000;

// Middleware
app.use(express.json())

const JWT_SECRET = process.env.JWT_SECRET;

// connect to mongoDB
mongoose.connect('mongodb://localhost:27017/booksDirectory', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('connected to MongoDB'))
    .catch(err => { console.error('Could not connect to MongoDB', err); process.exit(1); })


function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // get the token from the request
    if (!token) {
        return res.status(401).json({ error: 'Access Denied' })
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid Token' })
        }

        req.user = user; // save the user info for later use
        next(); // move to the next middleware or route
    })
}


// Routes
app.use('/books', authenticateToken, booksRouter);

// Default route for homepage
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
// });

// default route for homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/login.html')
})

// route for homepage
app.get('/home', authenticateToken, (req, res) => {
    res.sendFile(__dirname + '/public/html/index.html');
});

// Route to update a book
app.get('/update-book', (req, res) => {
    res.sendFile(__dirname + '/public/html/update-book.html');
});

// Route to add a book
app.get('/add-book', (req, res) => {
    res.sendFile(__dirname + '/public/html/add-book.html');
});

// Route to delete a book
app.get('/delete-book/:id', (req, res) => {
    res.sendFile(__dirname + '/public/html/delete-book-by-id.html');
});

// Route to get a book by ID
app.get('/get-book/:id', (req, res) => {
    res.sendFile(__dirname + '/public/html/get-book-by-id.html');
});

app.use('/login', loginRouter)

//start Server
app.listen(port, () => console.log(`server running on http://localhost:${port}`))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).sendFile(path.join(__dirname, 'public', 'html', 'error.html'));
});

