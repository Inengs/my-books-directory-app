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
            booksList.innerHTML = '';
            books.forEach((book) => {
                const bookItem = document.createElement('div');
                bookItem.innerHTML = `
                    <h3>${book.title}</h3>
                    <p>Author: ${book.author}</p>
                    <p>${book.genre}</p>
                    <p>${book.publicationYear}</p>
                    <p>${book.isbn}</p>
                `;
                booksList.appendChild(bookItem);
            });
            // Update pagination controls
            updatePaginationControls(totalPages);
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
        pageItem.addEventListener('click', () => {
            currentPage = i;
            fetchBooks(i);
        });
        paginationControls.appendChild(pageItem);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchBooks(currentPage);
});

async function deleteBook(bookId) {
    try {
        const response = await fetch(`/books/${bookId}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            alert('Book deleted successfully')
        }
        document.querySelector(`.book-card[data-id="${bookid}]`)

    } catch (error) {
        console.error('Error deleting book:', error);
    }
}