// UPDATE A BOOK ON THE PAGE USING THE UPDATE BOOK FORM

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Please log in to access this page');
        window.location.href = '/';
        return;
    }
});


document.getElementById('update-book-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading"></span> Updating...';

    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Please log in to add a book');
        window.location.href = '/';
        return;
    }

    const isTokenValid = await window.validateToken(token); // From utils.js
    if (!isTokenValid) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('authToken');
        window.location.href = '/';
        return;
    }

    const isbn = document.getElementById('isbn').value;
    if (!/^\d{10}|\d{13}$/.test(isbn)) {
        alert('ISBN must be 10 or 13 digits');
        return;
    }

    const bookID = document.getElementById('book-id').value;

    try {
        const response = await fetch(`/books/${bookID}`, {
            method: 'PUT',
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

        })

        if (response.ok) {
            const data = await response.json();
            alert('Book updated Successfully');
            document.getElementById('update-book-form').reset();
            document.getElementById('bookDetails').innerHTML = `
                <p>Title: ${data.title}</p>
                <p>Author: ${data.author}</p>
                <p>Genre: ${data.genre}</p>
                <p>Publication Year: ${data.publicationYear}</p>
                <p>ISBN: ${data.isbn}</p>
            `;
        } else {
            if (response.status === 401 || response.status === 403) {
                alert('Session expired. Please log in again.');
                localStorage.removeItem('authToken');
                window.location.href = '/';
            } else {
                const errorData = await response.json();
                alert(`Failed to update book: ${errorData.error || 'Unknown error'}`);
            }
        }

    } catch (error) {
        console.error('Error updating book:', error)
        alert('An error occurred while getting the book. Please try again.');
    }

    submitButton.disabled = false;
    submitButton.innerHTML = 'Update Book';
})

document.getElementById('logout-button')?.addEventListener('click', window.logout); // From utils.js



