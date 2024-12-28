// import dependencies
const express = require('express');
const mongoose = require('mongoose');
// const Book = require('./models/schema');

const path = require('path');
const Book = require(path.join(__dirname, 'models', 'schema'));
const bodyParser = require('body-parser');
const booksRouter = require('./routes/books');

// initialize app
const app = express();

// serve static files from the public directory
app.use(express.static('public'));

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

// Default route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});


//start Server
app.listen(port, () => console.log(`server running on http://localhost:${port}`))


console.log(path.join(__dirname, 'models', 'schema')); 