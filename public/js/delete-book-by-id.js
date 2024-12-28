// DELETE BOOK BY ID USING THE DELETE BOOK FORM
document.getElementById('delete-book-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const bookID = document.getElementById('book-id').value

    try {
        const response = await fetch(`/books/${bookID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            alert('Book deleted successfully')
            console.log(`Book with ID ${bookID} deleted.`)
        } else {
            alert('Book deletion unsuccessful')
        }
    } catch (error) {
        console.error('Error deleting book: ', error)
        alert('An error occurred while deleting the book.')
    }
});