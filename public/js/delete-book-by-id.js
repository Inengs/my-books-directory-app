// DELETE BOOK BY ID USING THE DELETE BOOK FORM

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Please log in to access this page');
        window.location.href = '/';
        return;
    }
});

document.getElementById('delete-book-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = e.target.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="loading"></span> Deleting...';

    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Please log in to delete a book');
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

    const bookID = document.getElementById('book-id').value
    try {
        const response = await fetch(`/books/${bookID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (response.ok) {
            alert('Book deleted successfully')
            console.log(`Book with ID ${bookID} deleted.`)
        } else {
            if (response.status === 401 || response.status === 403) {
                alert('Session expired. Please log in again.');
                localStorage.removeItem('authToken');
                window.location.href = '/';
            } else {
                const errorData = await response.json();
                alert(`Failed to delete book: ${errorData.error || 'Unknown error'}`);
            }
        }
    } catch (error) {
        console.error('Error deleting book: ', error)
        alert('An error occurred while deleting the book.')
    }

    submitButton.disabled = false;
    submitButton.innerHTML = 'delete Book';
});

document.getElementById('logout-button')?.addEventListener('click', window.logout); // From utils.js