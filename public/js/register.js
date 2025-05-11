document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Registration successful! Please log in.');
            window.location.href = '/login';
        } else {
            alert(`Registration failed: ${data.error || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error registering:', error);
        alert('An error occurred while registering. Please try again.');
    }
});