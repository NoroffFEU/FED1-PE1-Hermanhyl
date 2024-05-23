// Function to handle logout
function logoutUser() {
    localStorage.removeItem('access-token'); // Remove access token from local storage
    window.location.href = '../account/login.html'; // Redirect to login page
}

// Function to check if the user is logged in
export function isLoggedIn() {
    const accessToken = JSON.parse(localStorage.getItem('access-token'));
    return accessToken ? true : false;
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('#login-form');

    // Add event listener to the login form if it exists
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            try {
                // Login logic...
            } catch (error) {
                console.error('Error while logging in:', error);
            }
        });
    }

    // Get the logout button element
    const logoutButton = document.querySelector('#logout-button');

    // Add event listener to the logout button if it exists
    if (logoutButton) {
        logoutButton.addEventListener('click', logoutUser);
    }

    // Check login state and update UI accordingly
    const editButtons = document.querySelectorAll('.edit-button');
    if (isLoggedIn()) {
        // User is logged in, show buttons
        document.querySelectorAll('.login-required').forEach(button => {
            button.style.display = 'block';
        });
        // Show the edit button
        editButtons.forEach(button => {
            button.style.display = 'block';
        });
    } else {
        // User is not logged in, hide buttons
        document.querySelectorAll('.login-required').forEach(button => {
            button.style.display = 'none';
        });
        // Hide the edit button
        editButtons.forEach(button => {
            button.style.display = 'none';
        });
    }
});