// ADD A BOOK ON THE PAGE USING THE ADD BOOK FORM

// Check token on page load
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Please log in to access this page');
        window.location.href = '/';
        return;
    }
});



document.getElementById('add-book-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading"></span> Adding...';

    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Please log in to add a book');
        window.location.href = '/';
        return;
    }

    // Validate token before proceeding
    const isTokenValid = await window.validateToken(token);
    if (!isTokenValid) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('authToken');
        window.location.href = '/';
        return;
    }

    const isbn = document.getElementById('isbn').value;
    if (!/^\d{10}|\d{13}$/.test(isbn)) {
        alert('ISBN must be 10 or 13 digits');
        submitButton.disabled = false;
        submitButton.innerHTML = 'Add Book';
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
            if (response.status === 401 || response.status === 403) {
                alert('Session expired. Please log in again.');
                localStorage.removeItem('authToken');
                window.location.href = '/';
            } else {
                const errorData = await response.json();
                alert(`Failed to add book: ${errorData.error || 'Unknown error'}`);
            }
        }
    } catch (error) {
        console.error('Error: failed to add book', error);
        alert('An error occurred while adding the book.');
    }

    submitButton.disabled = false;
    submitButton.innerHTML = 'Add Book';
});

// Add logout button event listener
document.getElementById('logout-button')?.addEventListener('click', window.logout); // From utils.js