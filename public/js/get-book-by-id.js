// public/js/get-book-by-id.js
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Please log in to access this page');
        window.location.href = '/login';
        return;
    }

    // Populate book select dropdown
    try {
        const response = await fetch('/books?page=1&limit=100', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            const books = data.books;
            const bookSelect = document.getElementById('book-select');
            books.forEach((book) => {
                const option = document.createElement('option');
                option.value = book._id;
                option.textContent = `${book.title} (ID: ${book._id})`;
                bookSelect.appendChild(option);
            });
        } else {
            console.error('Failed to fetch books for dropdown');
        }
    } catch (error) {
        console.error('Error fetching books for dropdown:', error);
    }
});

// Auto-fill input when selecting a book
document.getElementById('book-select').addEventListener('change', (e) => {
    document.getElementById('book-id').value = e.target.value;
});

document.getElementById('get-book-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading"></span> Retrieving...';

    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Please log in to get a book');
        window.location.href = '/login';
        return;
    }

    const isTokenValid = await window.validateToken(token);
    if (!isTokenValid) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        return;
    }

    // Use book ID from input or select
    const bookID = document.getElementById('book-id').value || document.getElementById('book-select').value;
    if (!bookID) {
        alert('Please select a book or enter a valid book ID');
        submitButton.disabled = false;
        submitButton.innerHTML = 'Get Book';
        return;
    }

    try {
        const response = await fetch(`/books/${bookID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('bookDetails').innerHTML = `
                <p><strong>Title:</strong> ${data.title}</p>
                <p><strong>Author:</strong> ${data.author}</p>
                <p><strong>Genre:</strong> ${data.genre}</p>
                <p><strong>Publication Year:</strong> ${data.publicationYear}</p>
                <p><strong>ISBN:</strong> ${data.isbn}</p>
                <p><strong>ID:</strong> ${data._id}</p>
            `;
            alert('Book retrieved successfully');
        } else {
            throw new Error(data.error || 'Failed to get book');
        }
    } catch (error) {
        console.error('Error retrieving book:', error);
        alert(`Error: ${error.message}`);
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Get Book';
    }
});

document.getElementById('logout-button')?.addEventListener('click', window.logout);


































// // GET A BOOK BY ID USING THE GET BOOK FORM

// document.addEventListener('DOMContentLoaded', () => {
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//         alert('Please log in to access this page');
//         window.location.href = '/';
//         return;
//     }
// });

// document.getElementById('get-book-form').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const submitButton = e.target.querySelector('button[type="submit"]');
//     submitButton.disabled = true;
//     submitButton.innerHTML = '<span class="loading"></span> Retrieving...';

//     const token = localStorage.getItem('authToken');
//     if (!token) {
//         alert('Please log in to add a book');
//         window.location.href = '/';
//         return;
//     }

//     const isTokenValid = await window.validateToken(token); // From utils.js
//     if (!isTokenValid) {
//         alert('Session expired. Please log in again.');
//         localStorage.removeItem('authToken');
//         window.location.href = '/';
//         return;
//     }

//     const bookID = document.getElementById('book-id').value;

//     try {
//         const response = await fetch(`/books/${bookID}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             }
//         })

//         // Check if the response is OK
//         if (response.ok) {
//             // Parse the response JSON
//             const data = await response.json();

//             // Update the form with the book details
//             document.getElementById('bookDetails').innerHTML = `
//             <p><strong>Title:</strong> ${data.title}</p>
//             <p><strong>Author:</strong> ${data.author}</p>
//             <p><strong>Genre:</strong> ${data.genre}</p>
//             <p><strong>Publication Year:</strong> ${data.publicationYear}</p>
//             <p><strong>ISBN:</strong> ${data.isbn}</p>
//         `;

//             alert('Book retrieved Successfully')
//         } else {
//             if (response.status === 401 || response.status === 403) {
//                 alert('Session expired. Please log in again.');
//                 localStorage.removeItem('authToken');
//                 window.location.href = '/';
//             } else {
//                 const errorData = await response.json();
//                 alert(`Failed to get book: ${errorData.error || 'Unknown error'}`);
//             }
//         }

//     } catch (error) {
//         console.error('Error retrieving book:', error)
//         alert('An error occurred while getting the book. Please try again.');
//     }

//     submitButton.disabled = false;
//     submitButton.innerHTML = 'Get Book';
// })

// document.getElementById('logout-button')?.addEventListener('click', window.logout); // From utils.js