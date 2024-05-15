import { getAuthToken } from "../js-files/handlers/handleAuthLogin.mjs";

export async function doFetch(url, isAuth = false, options = {}) {
    try {
        const headers = {
            'content-Type': 'application/json',
        };
        if (isAuth) {
            const authToken = getAuthToken();
            headers["authorization"] = `Bearer ${authToken}`;
        };

        const combinedOptions = {headers, ...options };

        const response = await fetch(url, combinedOptions);
        console.log(response);
        const json = await response.json();
        return json;
    } catch (error) {
        throw error;
    } finally {
        //
    }
}








// Function to fetch the API documentation
// export async function fetchAPI() {
//     const url = 'https://v2.api.noroff.dev';

//     try {
//         const response = await fetch(url);
//         const json = response.json();
//         if (!response.ok) {
//             throw new Error('Failed to fetch API documentation');
//         }
//         const data = await response.text();
//         return data, json;
//     } catch (error) {
//         console.error('Error fetching API documentation:', error);
//         return null;
//     }
// }

// Call the function to fetch the API documentation
// fetchAPI()
//     .then(data => {
//         console.log('API documentation:', data);
//         // Handle the documentation (e.g., display it on the page)
//     })
//     .catch(error => {
//         console.error('Error fetching API documentation:', error);
//         // Handle the error
//     });
