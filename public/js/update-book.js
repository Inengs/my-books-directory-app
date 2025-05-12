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
        submitButton.disabled = false;
        submitButton.innerHTML = 'Update Book';
        return;
    }

    const isTokenValid = await window.validateToken(token); // From utils.js
    if (!isTokenValid) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('authToken');
        window.location.href = '/';
        submitButton.disabled = false;
        submitButton.innerHTML = 'Update Book';
        return;
    }

    const isbn = document.getElementById('isbn').value;
    if (!/^\d{10}(\d{3})?$/.test(isbn)) {
        alert('ISBN must be exactly 10 or 13 digits');
        submitButton.disabled = false;
        submitButton.innerHTML = 'Update Book';
        return;
    }

    const bookID = document.getElementById('book-id').value;
    const bookData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        genre: document.getElementById('genre').value,
        publicationYear: parseInt(document.getElementById('publicationYear').value),
        isbn,
    };

    try {
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

        const response = await fetch(`/books/${bookID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(bookData),
            signal: controller.signal,

        });

        clearTimeout(timeoutId); // Clear timeout if request completes

        const data = await response.json();
        if (response.ok) {
            alert('Book updated Successfully');
            document.getElementById('update-book-form').reset();
            document.getElementById('bookDetails').innerHTML = `
                <p><strong>Title:</strong> ${data.title}</p>
                <p><strong>Author:</strong> ${data.author}</p>
                <p><strong>Genre:</strong> ${data.genre}</p>
                <p><strong>Publication Year:</strong> ${data.publicationYear}</p>
                <p><strong>ISBN:</strong> ${data.isbn}</p>
                <p><strong>ID:</strong> ${data._id}</p>
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
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Update Book';
    }


})

document.getElementById('logout-button')?.addEventListener('click', window.logout); // From utils.js



