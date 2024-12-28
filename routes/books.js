const express = require('express')
const router = express.Router()
const Book = require('./models/schema')


// get all books
router.get('/', async (req, res) => {
    try {
        const Books = await Book.find()
        res.json(Books)
    } catch (err) {
        res.status(500).json({ error: 'failed to get books' })
    }
})

// Add a new book
router.post('/', async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save(); //save the new book to the database
        res.status(201).json(savedBook) // respond with a success message
    } catch (err) {
        res.status(400).json({ error: " failed to add the book" }) // respond with an error message
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
        try {
            const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
            })
            if (!updatedBook) {
                return res.status(404).json({ error: 'Book not found' })
            }
        } catch (err) {
            res.status(400).json({ error: 'failed to update book' })
        }
    })
    // Delete a book by id
    .delete(async (req, res) => {
        try {
            const deletedBook = await Book.findByIdAndDelete(req.params.id);
            if (!deletedBook) {
                return res.status(404).json({ error: 'Book not found' })
            }
            res.json({ message: 'Book deleted successfully' })
        } catch (err) {
            res.status(500).json({ error: 'Failed to delete book' })
        }
    })

module.exports = router;