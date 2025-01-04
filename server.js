// import dependencies
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/schema');
const bodyParser = require('body-parser');
const booksRouter = require('./routes/books');
const path = require('path');

// initialize app
const app = express();

// serve static files from the public directory
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("public"))

// initialize port
const port = 3000;

// Middleware
app.use(bodyParser.json())

// connect to mongoDB
mongoose.connect('mongodb://localhost:27017/booksDirectory', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err))

// Routes
app.use('/books', booksRouter);

// Default route for homepage
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'html', 'index.html'));
// });

app.get('/', (req, res) => {
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

//start Server
app.listen(port, () => console.log(`server running on http://localhost:${port}`))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

