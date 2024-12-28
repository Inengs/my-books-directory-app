// GET A BOOK BY ID USING THE GET BOOK FORM

document.getElementById('get-book-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const bookID = document.getElementById('book-id').value;

    try {
        const response = await fetch(`/books/${bookID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // Check if the response is OK
        if (response.ok) {
            // Parse the response JSON
            const data = await response.json();

            // Update the form with the book details
            document.getElementById('title').value = data.title;
            document.getElementById('author').value = data.author;
            document.getElementById('genre').value = data.genre;
            document.getElementById('publicationYear').value = data.publicationYear;
            document.getElementById('isbn').value = data.isbn;

            alert('Book retrieved Successfully')
        } else {
            alert('Failed to retrieve book')
        }

        // Handle success
        console.log('Book retrieved successfully', data)
    } catch (error) {
        console.error('Error retrieving book:', error)
    }

})