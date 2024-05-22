import {API_Login_Url} from "../js-files/constant.mjs"
import { doFetch } from "../js-files/doFetch.mjs";


const runPage = () => {
    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault() 
        try {
            let formData = new FormData(loginForm)
            const response = await doFetch(API_Login_Url, false, {
                method: 'POST',
                body: JSON.stringify({
                    email: formData.get('username'),
                    password: formData.get('password')
                })
            });
            console.log('login successful',response);
            if(!response) {
                alert('your email or password is wrong') 
                return
            }
            console.log(response); // Log the entire response object
            const accessToken = response.data.accessToken;
            localStorage.setItem('access-token', JSON.stringify(accessToken));
        } catch (error) {
            console.error('Error while logging in:', error);
        }
    })
}

runPage()