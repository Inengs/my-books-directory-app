const mongoose = require('mongoose');

// Define the bookSchema
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    isbn: { type: String, required: true },
})

// Define the User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password
})

// Create the model
const Book = mongoose.model('Book', bookSchema);
const User = mongoose.model('User', userSchema);

module.exports = { User, Book };