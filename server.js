// import dependencies
const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/schema');
const bodyParser = require('body-parser')

// initialize app
const app = express();

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


//start Server
app.listen(port, () => console.log(`server running on http://localhost:${port}`))
