function logoutUser() {
    localStorage.removeItem('access-token');
    window.location.href = '../account/login.html'; 
}

export function isLoggedIn() {
    const accessToken = JSON.parse(localStorage.getItem('access-token'));
    return accessToken ? true : false;
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('#login-form');

    
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            try {
            } catch (error) {
                console.error('Error while logging in:', error);
            }
        });
    }

    const logoutButton = document.querySelector('#logout-button');

    
    if (logoutButton) {
        logoutButton.addEventListener('click', logoutUser);
    }

    
    const editButtons = document.querySelectorAll('.edit-button');
    if (isLoggedIn()) {
        document.querySelectorAll('.login-required').forEach(button => {
            button.style.display = 'block';
        });
        editButtons.forEach(button => {
            button.style.display = 'block';
        });
    } else {
        document.querySelectorAll('.login-required').forEach(button => {
            button.style.display = 'none';
        });
        editButtons.forEach(button => {
            button.style.display = 'none';
        });
    }
});