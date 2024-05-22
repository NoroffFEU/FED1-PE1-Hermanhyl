import {API_Edit_Post} from "../js-files/constant.mjs"

function getAccessToken() {
    const userInfo = JSON.parse(localStorage.getItem('access-token'));
    console.log(userInfo);
    return userInfo ? userInfo : ' ';
}

async function editBlogPost() { 
    const id = window.location.search.slice(1)
    const accessToken = getAccessToken();
    console.log(accessToken);
    const form = document.getElementById('add-post')
    form.addEventListener('submit', async (event) => {
        event.preventDefault()
    const formData = new FormData(form)
    try {
        const response = await fetch(API_Edit_Post + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ` + accessToken,
            },
            body: JSON.stringify({
                media: {
                    url: formData.get('image'),
                    alt: 'image of blog post; ' + formData.get('title'),
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
        throw error; // rethrow the error to handle it outside
    } finally {
        window.location.href = 'index.html?id=' + id;
    }
    })
}

editBlogPost()