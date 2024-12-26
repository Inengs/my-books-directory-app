//selecting all delete buttons
const deleteButtons = document.querySelectorAll('.delete-button')

// Add event listeners for click
deleteButtons.forEach((value, key) => { // loop through each delete button getting there index and value/button
    value.addEventListener('click', async () => {
        const BookID = 
        try {
            const response = await fetch(`/books/${BookID}`, {
                method: 'Delete',
            })
            if (response.ok) {
                alert('Book deleted Successfully')
                // Remove the book card from the DOM
                document.querySelectorAll('.book-card')[key].remove()
            } else {
                alert('Failed to delete book')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    })
})

