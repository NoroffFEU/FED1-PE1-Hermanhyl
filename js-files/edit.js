import { API_Edit_Post } from "../js-files/constant.mjs";

// Function to get access token
function getAccessToken() {
    const userInfo = JSON.parse(localStorage.getItem('access-token'));
    return userInfo ? userInfo : ' ';
}

// Function to edit the blog post
async function editBlogPost() {
    const id = window.location.search.slice(1);
    const accessToken = getAccessToken();
    const form = document.getElementById('edit-post');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        try {
            const response = await fetch(API_Edit_Post + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    media: {
                        url: formData.get('image'),
                        alt: 'image of blog post; ' + formData.get('title'),
                    },
                    title: formData.get('title'),
                    body: formData.get('content'),
                }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            alert('Failed to update post. Please try again later.');
            console.error('Error updating post:', error);
            throw error; // rethrow the error to handle it outside
        } finally {
            window.location.href = 'index.html?id=' + id;
        }
    });
}

// Function to delete the blog post
async function deleteBlogPost() {
    const id = window.location.search.slice(1);
    const accessToken = getAccessToken();
    try {
        const response = await fetch(`${API_Edit_Post}${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete post');
        }

        alert('Post deleted successfully');
        window.location.href = '../index.html'; // Redirect to index page after deletion
    } catch (error) {
        alert('Failed to delete post. Please try again later.');
        console.error('Error deleting post:', error);
    }
}

// Event listener for the delete button
document.getElementById('delete-post').addEventListener('click', async () => {
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
        await deleteBlogPost();
    }
});

// Call the editBlogPost function to initialize the edit functionality
editBlogPost();