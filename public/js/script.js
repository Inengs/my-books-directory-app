let currentPage = 1;
const limit = 20; // Number of books per page
const booksList = document.getElementById('books-list');
const paginationControls = document.getElementById('pagination-controls');


async function fetchBooks(page = 1) {
    booksList.innerHTML = '<div class="loading"></div>';

    const token = localStorage.getItem('authToken');
    console.log('Token in fetchBooks:', token); // Log token
    if (!token) {
        console.log('Invalid or missing token');
        alert('Please log in to view books');
        window.location.href = '/';
        return;
    }

    // Validate token before proceeding
    const isTokenValid = await window.validateToken(token);
    console.log('Token validation result:', isTokenValid); // Log result
    if (!isTokenValid) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('authToken');
        window.location.href = '/';
        return;
    }

    try {
        const response = await fetch(`/books?page=${page}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            const { books, totalPages } = data;
            booksList.innerHTML = ''; // Clear the books list
            if (books.length === 0) {
                booksList.innerHTML = '<p>No books found. Add a book to get started!</p>';
                paginationControls.innerHTML = '';
                return;
            }
            books.forEach((book) => {
                const bookItem = document.createElement('div');
                bookItem.classList.add('book-card'); // Add class to each book item
                bookItem.setAttribute('data-id', book._id); // Set a unique data-id for each book

                bookItem.innerHTML = `
                    <h3>${book.title}</h3>
                    <p>Author: ${book.author}</p>
                    <p>Genre: ${book.genre}</p>
                    <p>Publication Year: ${book.publicationYear}</p>
                    <p>ISBN: ${book.isbn}</p>
                    <button class="delete-button" data-id="${book._id}">Delete</button>
                `;

                // append book item to the list
                booksList.appendChild(bookItem);
            });

            // Update pagination controls
            updatePaginationControls(totalPages);

            const deleteButtons = document.querySelectorAll('.delete-button');
            deleteButtons.forEach((button) => {
                button.addEventListener('click', (e) => {
                    const bookId = e.target.getAttribute('data-id');
                    deleteBook(bookId, e.target.closest('.book-card')); // Delete the book from the UI
                });
            });
        } else {
            if (response.status === 401 || response.status === 403) {
                alert('Session expired. Please log in again.');
                localStorage.removeItem('authToken');
                window.location.href = '/';
            } else {
                console.error('Failed to fetch books. Server returned:', response.status);
                alert('Failed to load books. Please try again.');
            }
        }
    } catch (error) {
        console.error('Error fetching books:', error);
        alert('Error loading books. Please try again.');
    }
}

function updatePaginationControls(totalPages) {
    paginationControls.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('button');
        pageItem.innerText = i;
        pageItem.classList.add('pagination-button');
        if (i === currentPage) {
            pageItem.classList.add('active');
        }
        pageItem.addEventListener('click', () => {
            currentPage = i;
            fetchBooks(i);
        });
        paginationControls.appendChild(pageItem);
    }
}

async function deleteBook(bookId, bookElement) {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Please log in to delete a book');
        window.location.href = '/';
        return;
    }

    // Validate token before deletion
    const isTokenValid = await window.validateToken(token);
    if (!isTokenValid) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('authToken');
        window.location.href = '/';
        return;
    }

    try {
        const response = await fetch(`/books/${bookId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            bookElement.remove();
            alert('Book deleted successfully');
        } else {
            if (response.status === 401 || response.status === 403) {
                alert('Session expired. Please log in again.');
                localStorage.removeItem('authToken');
                window.location.href = '/';
            } else {
                alert('Failed to delete book');
            }
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        alert('Error deleting book. Please try again.');
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Please log in to view this page');
        window.location.href = '/';
        return;
    }
    fetchBooks(currentPage);
});

// Add logout button event listener
document.getElementById('logout-button')?.addEventListener('click', window.logout);