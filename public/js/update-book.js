// UPDATE A BOOK ON THE PAGE USING THE UPDATE BOOK FORM

document.getElementById('update-book-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const bookID = document.getElementById('book-id').value;

    try {
        const response = await fetch(`/books/${bookID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: document.getElementById('title').value,
                author: document.getElementById('author').value,
                genre: document.getElementById('genre').value,
                publicationYear: document.getElementById('publicationYear').value,
                isbn: document.getElementById('isbn').value,
            })

        })

        // Check if the response is OK
        if (response.ok) {
            // Parse the response JSON
            const data = await response.json();

            alert('Book updated Successfully')

            // Handle success
            console.log('Book updated successfully', data)

        } else {
            alert('Failed to update book')
        }


    } catch (error) {
        console.error('Error updating book:', error)
    }

})



