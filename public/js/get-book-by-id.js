// GET A BOOK BY ID USING THE GET BOOK FORM

document.getElementById('get-book-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Please log in to add a book');
        window.location.href = '/';
        return;
    }

    const bookID = document.getElementById('book-id').value;

    try {
        const response = await fetch(`/books/${bookID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        // Check if the response is OK
        if (response.ok) {
            // Parse the response JSON
            const data = await response.json();

            // Update the form with the book details
            document.getElementById('title').innerText = data.title;
            document.getElementById('author').innerText = data.author;
            document.getElementById('genre').innerText = data.genre;
            document.getElementById('publicationYear').innerText = data.publicationYear;
            document.getElementById('isbn').innerText = data.isbn;

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