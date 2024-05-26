import {API_Add_Post_Url} from "../js-files/constant.mjs"

function getAccessToken() {
    const userInfo = JSON.parse(localStorage.getItem('access-token'));
    return userInfo ? userInfo : ' ';
}

async function addBlogPost() {
    const accessToken = getAccessToken();
    const form = document.getElementById('add-post')
    form.addEventListener('submit', async (event) => {
        event.preventDefault()
    const formData = new FormData(form)
    try {
        const response = await fetch(API_Add_Post_Url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ` + accessToken,
            },
            body: JSON.stringify({
                media: {
                    url: formData.get('image'),
                    alt: 'image of blog post; ' + formData.get('alt-image'),
                },
                title: formData.get('title'),
                body: formData.get('content')
            })
        });

        const data = await response.json();
        return data;
    } catch (error) {
        alert('Failed to add post. Please try again later.');
        console.error('Error adding post:', error);
        throw error;
    } finally {
        window.location.href = '../index.html';
    }
    })
}

addBlogPost()