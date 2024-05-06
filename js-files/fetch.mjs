// Function to fetch the API documentation
export async function fetchAPI() {
    const url = 'https://v2.api.noroff.dev';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch API documentation');
        }
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error fetching API documentation:', error);
        return null;
    }
}

// Call the function to fetch the API documentation
fetchAPI()
    .then(data => {
        console.log('API documentation:', data);
        // Handle the documentation (e.g., display it on the page)
    })
    .catch(error => {
        console.error('Error fetching API documentation:', error);
        // Handle the error
    });
