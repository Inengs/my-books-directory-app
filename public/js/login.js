document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // prevent the default happening of a submit button

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            // save the JWT token in localStorage or a cookie
            localStorage.setItem('authToken', data.token);

            // Redirect to the home page
            window.location.href = '/home';
        } else {
            // Display error
            document.getElementById('error-message').innerText = data.error || 'Login failed. ';
        }

    } catch (err) {
        console.error('Error during login: ', err);
        document.getElementById('error-message').innerText = 'An error occurred. Please try again.';
    }

});