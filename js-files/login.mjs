import { API_Login_Url } from "../js-files/constant.mjs";
import { doFetch } from "../js-files/doFetch.mjs";

// Function to handle logout
function logoutUser() {
    localStorage.removeItem('access-token'); // Remove access token from local storage
    window.location.href = '../account/login.html'; // Redirect to login page
}

// Function to check if the user is logged in
function isLoggedIn() {
    const accessToken = JSON.parse(localStorage.getItem('access-token'));
    return accessToken ? true : false;
}

document.addEventListener('DOMContentLoaded', function() {
    const runPage = () => {
        const loginForm = document.querySelector('#login-form');
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            try {
                let formData = new FormData(loginForm);
                const response = await doFetch(API_Login_Url, false, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: formData.get('username'),
                        password: formData.get('password')
                    })
                });
                console.log('login successful', response);
                if (!response) {
                    alert('Your email or password is wrong');
                    return;
                }
                console.log(response); // Log the entire response object
                const accessToken = response.data.accessToken;
                localStorage.setItem('access-token', JSON.stringify(accessToken));
                // Redirect to the index page
                window.location.href = '../index.html';
            } catch (error) {
                console.error('Error while logging in:', error);
            }
        });

        // Get the logout button element
        const logoutButton = document.querySelector('#logout-button');

        // Add event listener to the logout button
        if (logoutButton) {
            logoutButton.addEventListener('click', logoutUser);
        }

        // Check login state and update UI accordingly
        if (isLoggedIn()) {
            // User is logged in, show buttons
            logoutButton.style.display = 'block'; // Show the logout button
            document.querySelectorAll('.login-required').forEach(button => {
                button.style.display = 'block';
            });
        } else {
            // User is not logged in, hide buttons
            logoutButton.style.display = 'none'; // Hide the logout button
            document.querySelectorAll('.login-required').forEach(button => {
                button.style.display = 'none';
            });
        }
    }

    runPage();
});