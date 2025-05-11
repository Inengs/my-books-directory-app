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