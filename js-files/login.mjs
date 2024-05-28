import { API_Login_Url } from "../js-files/constant.mjs";
import { doFetch } from "../js-files/doFetch.mjs";

function logoutUser() {
    localStorage.removeItem('access-token');
    window.location.href = '../account/login.html';
}

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
                if (!response) {
                    alert('Your email or password is wrong');
                    return;
                }
                const accessToken = response.data.accessToken;
                localStorage.setItem('access-token', JSON.stringify(accessToken));
                window.location.href = '../index.html';
            } catch (error) {
                console.error('Error while logging in:', error);
            }
        });

        const logoutButton = document.querySelector('#logout-button');

        if (logoutButton) {
            logoutButton.addEventListener('click', logoutUser);
        }

        if (isLoggedIn()) {
            logoutButton.style.display = 'block'; 
            document.querySelectorAll('.login-required').forEach(button => {
                button.style.display = 'block';
            });
        } else {
            logoutButton.style.display = 'none'; // Hide the logout button
            document.querySelectorAll('.login-required').forEach(button => {
                button.style.display = 'none';
            });
        }
    }

    runPage();
});