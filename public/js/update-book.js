// UPDATE A BOOK ON THE PAGE USING THE UPDATE BOOK FORM

document.getElementById('update-book-form').addEventListener('submit', async (e) => {
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
            alert('Failed to update book')
        }


    } catch (error) {
        console.error('Error updating book:', error)
    }

})



