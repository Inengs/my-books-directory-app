// import dependencies
const express = require('express');
const mongoose = require('mongoose');
const { Book } = require('./models/schema');
const booksRouter = require('./routes/books');
const methodOverride = require('method-override')
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv')
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');


dotenv.config();
console.log('MONGO_URI:', process.env.MONGO_URI);
// initialize app
const app = express();

app.use(express.urlencoded({ extended: true }));

// use method-override middleware
app.use(methodOverride('_method'));

// serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));



// Middleware
app.use(express.json())

const JWT_SECRET = process.env.JWT_SECRET || 'YOUR_DEFAULT_SECRET_KEY';
console.log('JWT_SECRET in server.js:', JWT_SECRET);
const port = process.env.PORT || 3000; // initialize port

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.error('Error: MONGO_URI is not defined in .env file');
    process.exit(1);
}

// connect to mongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Could not connect to MongoDB', err);
        process.exit(1);
    });


const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds)
}

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1]; // get the token from the request
    console.log('Token received:', token);

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ error: 'Access Denied' })
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.log('Token verification error:', err.message);
            return res.status(403).json({ error: 'Invalid Token' })
        }

        console.log('Token verified, user:', user);
        req.user = user; // save the user info for later use
        next(); // move to the next middleware or route
    })
}


// Routes
app.use('/books', authenticateToken, booksRouter);

app.use('/login', loginRouter);

app.use('/register', registerRouter)


// default route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'register.html'));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'));
});

// route for homepage
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
});

// Route to update a book
app.get('/update-book', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'update-book.html'));
});

// Route to add a book
app.get('/add-book', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'add-book.html'));
});

// Route to delete a book
app.get('/delete-book', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'delete-book-by-id.html'));
});

// Route to get a book by ID
app.get('/get-book', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'get-book-by-id.html'));
});


//start Server
app.listen(port, () => console.log(`server running on http://localhost:${port}`))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).sendFile(path.join(__dirname, 'public', 'html', 'error.html'));
});

