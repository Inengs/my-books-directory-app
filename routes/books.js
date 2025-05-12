const express = require('express')
const router = express.Router()
const Book = require('../models/schema').Book;


// get all books
router.get('/', async (req, res) => {
    const { page = 1, limit = 20 } = req.query; // Default to page 1, 20 books per page

    try {
        const books = await Book.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        const totalBooks = await Book.countDocuments();

        res.json({
            books,
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch books' });
    }
});


// Add a new book
router.post('/', async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save(); //save the new book to the database
        res.status(201).json(savedBook) // respond with a success message
    } catch (err) {
        res.status(400).json({ error: " failed to add the book", details: err.message }) // respond with an error message
    }
})


router
    .route("/:id")
    //get a book by id
    .get(async (req, res) => {
        try {
            const requiredBook = await Book.findById(req.params.id)
            if (!requiredBook) {
                return res.status(404).json({ error: 'Book not found' })
            }
            res.json(requiredBook)
        } catch (err) {
            res.status(500).json({ error: 'failed to get the required book' })
        }
    })
    // Update a book by id
    .put(async (req, res) => {
        const { title, author, genre, publicationYear, isbn } = req.body;

        // Validate inputs
        if (!title || !author || !genre || !publicationYear || !isbn) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!/^\d{10}(\d{3})?$/.test(isbn)) {
            return res.status(400).json({ error: 'ISBN must be exactly 10 or 13 digits' });
        }

        try {
            const updatedBook = await Book.findByIdAndUpdate(
                req.params.id,
                { title, author, genre, publicationYear, isbn },
                {
                    new: true, // Return the updated book
                    runValidators: true, // Run schema validators
                }
            );

            if (!updatedBook) {
                return res.status(404).json({ error: 'Book not found' });
            }

            res.status(200).json(updatedBook);
        } catch (err) {
            console.error('Error updating book:', err);
            if (err.code === 11000) {
                // Duplicate ISBN error
                res.status(400).json({ error: 'ISBN already exists' });
            } else if (err.name === 'CastError') {
                res.status(400).json({ error: 'Invalid book ID format' });
            } else {
                res.status(400).json({ error: 'Failed to update book', details: err.message });
            }
        }
    })
    // Delete a book by id
    .delete(async (req, res) => {
        try {
            const deletedBook = await Book.findByIdAndDelete(req.params.id);
            if (!deletedBook) {
                return res.status(404).json({ error: 'Book not found' })
            }
            res.status(200).json({ message: 'Book deleted successfully' })
        } catch (err) {
            res.status(500).json({ error: 'Failed to delete book' })
        }
    })




module.exports = router;