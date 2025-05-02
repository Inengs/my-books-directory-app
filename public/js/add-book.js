// ADD A BOOK ON THE PAGE USING THE ADD BOOK FORM

document.getElementById('add-book-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Please log in to add a book');
        window.location.href = '/';
        return;
    }

    try {
        const response = await fetch('/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: document.getElementById('title').value,
                author: document.getElementById('author').value,
                genre: document.getElementById('genre').value,
                publicationYear: document.getElementById('publicationYear').value,
                isbn: document.getElementById('isbn').value,
            })
        });

        // Check if the response is OK
        if (response.ok) {
            const data = await response.json(); // Parse the response JSON
            alert('Book added Successfully');

            // Update the bookDetails div with the added book's details
            document.getElementById('bookDetails').innerHTML = `
                <p><strong>Title:</strong> ${data.title}</p>
                <p><strong>Author:</strong> ${data.author}</p>
                <p><strong>Genre:</strong> ${data.genre}</p>
                <p><strong>Publication Year:</strong> ${data.publicationYear}</p>
                <p><strong>ISBN:</strong> ${data.isbn}</p>
            `;

            document.getElementById('add-book-form').reset(); // Reset the form
        } else {
            alert('Failed to add book');
        }
    } catch (error) {
        console.error('Error: failed to add book', error);
        alert('An error occurred while adding the book.');
    }
});