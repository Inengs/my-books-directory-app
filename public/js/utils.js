// public/js/utils.js
async function validateToken(token) {
    try {
        const response = await fetch('/books', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('Validate token response:', response.status, response.statusText);
        if (response.status === 401) {
            console.log('Unauthorized: No token or invalid token');
            return false;
        }
        if (response.status === 403) {
            console.log('Forbidden: Token verification failed');
            return false;
        }
        return response.ok;
    } catch (error) {
        console.error('Token validation error:', error);
        return false;
    }
}

function logout() {
    localStorage.removeItem('authToken');
    alert('Logged out successfully');
    window.location.href = '/';
}

// Expose functions globally (since <script> tags don't support ES modules without a bundler)
window.validateToken = validateToken;
window.logout = logout;