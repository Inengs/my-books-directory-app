let currentPage = 1;
const limit = 20; // Number of books per page
const booksList = document.getElementById('books-list');
const paginationControls = document.getElementById('pagination-controls');


async function fetchBooks(page = 1) {
    try {
        const response = await fetch(`/books?page=${page}&limit=${limit}`)
        if (response.ok) {
            const data = await response.json();
            const { books, totalPages } = data;
            booksList.innerHTML = ''; // Clear the books list
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
                })
            })
        } else {
            console.error('Failed to fetch books. Server returned:', response.status);
        }
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

function updatePaginationControls(totalPages) {
    paginationControls.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('button');
        pageItem.innerText = i;
        pageItem.classList.add('pagination-button');
        if (i === currentPage) {
            pageItem.classList.add('active')
        }
        pageItem.addEventListener('click', () => {
            currentPage = i;
            fetchBooks(i);
        });
        paginationControls.appendChild(pageItem);
    }
}



async function deleteBook(bookId, bookElement) {
    try {
        const response = await fetch(`/books/${bookId}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            bookElement.remove();
            alert('Book deleted successfully')
        } else {
            alert('Failed to delete book')
        }
        document.querySelector(`.book-card[data-id="${bookId}"]`)

    } catch (error) {
        console.error('Error deleting book:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchBooks(currentPage);
});