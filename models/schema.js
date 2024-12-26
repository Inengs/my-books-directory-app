// Define the Schema
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    isbn: { type: String }
})

// Create the model
const Book = mongoose.model('Book', bookSchema)

module.exports = Book;