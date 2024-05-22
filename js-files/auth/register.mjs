import {register_Api} from "../constant.mjs"

import { doFetch } from "../doFetch.mjs";

const registerForm =  document.querySelector('#register-form')

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target[0].value
    const email = event.target[1].value
    const password = event.target[2].value
    registerUser(name, email, password);
});

async function registerUser(name, email, password) {
    console.log('register user');
    const response = await doFetch(register_Api, false, {
        method: 'POST',
        body: JSON.stringify({
            name,
            email,
            password
        }),
    });
    if (response.ok) {
        return await response.json();
    }
    throw new Error("could not register the account")
}



// import { register_Api } from "../constant.mjs";
// import { setRegisterFormListener } from "../handlers/register.mjs";

// const action = "/js-files/auth/register.mjs";
// const method = "post";

// export async function register(profile) {
//     // const registerUrl = api_Url + action;
//     const body = JSON.stringify(profile);

//     const response = await fetch(register_Api, {
//         headers: {
//             "content-Type": "application/json"
//         },
//         method: 'POST',
//         body: JSON.stringify({
//             name,
//             email,
//             password
//         })
//     })
// }

//     setRegisterFormListener()

//     const result = await response.json()
//     console.log(result);


