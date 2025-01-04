// ADD A BOOK ON THE PAGE USING THE ADD BOOK FORM

document.getElementById('add-book-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('/books', {
            method: 'POST',
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
            alert('Book added Successfully')

            document.getElementById('add-book-form').reset()
        } else {
            alert('Failed to add book')
        }
    } catch (error) {
        console.error('Error: failed to add book')
    }
})