import { API_Edit_Post } from "../js-files/constant.mjs";

function getAccessToken() {
    const userInfo = JSON.parse(localStorage.getItem('access-token'));
    return userInfo ? userInfo : ' ';
} 
async function fetchBlog(){
    try {
        const id = window.location.search.slice(1);
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/bilbobolla/${id}`, {    
            method: 'GET', 
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }) 
    
        const blog = await response.json(); 
        return blog.data
        } catch(error) {
            console.error(error)
        }
    
} 

async function editBlogPost() {
    const id = window.location.search.slice(1);
    const accessToken = getAccessToken();
    const form = document.getElementById('edit-post');

    const blog = await fetchBlog()
    const name = document.getElementById('image');
    const altImage = document.getElementById('alt-image');
    const title = document.getElementById('title');
    const content = document.getElementById('body');
    content.defaultValue = blog.body
    altImage.defaultValue = blog.media.alt
    title.defaultValue = blog.title
    name.defaultValue = blog.media.url
    

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
                        alt: 'image of blog post; ' + formData.get('alt-image'),
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
            throw error; 
        } finally {
            window.location.href = 'index.html?id=' + id;
        }
    });
}

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
        window.location.href = '../index.html'; 
    } catch (error) {
        alert('Failed to delete post. Please try again later.');
        console.error('Error deleting post:', error);
    }
}

document.getElementById('delete-post').addEventListener('click', async () => {
    const confirmDelete = confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
        await deleteBlogPost();
    }
});


editBlogPost();




// async function editBlogPost() {
//     const id = window.location.search.slice(1);
//     const accessToken = getAccessToken();
//     const form = document.getElementById('edit-post');

//     try {
//         // Fetch blog post data
//         const response = await fetch(`https://v2.api.noroff.dev/blog/posts/bilbobolla/${id}`, {
//             method: 'GET',
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//             },
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch blog post');
//         }

//         const blog = await response.json(); // Convert response to JSON
//         console.log(blog); // Check the fetched data

//         // Populate form fields with fetched data
//         const image = document.getElementById('image');
//         const altImage = document.getElementById('alt-image');
//         const title = document.getElementById('title');
//         const body = document.getElementById('body');

//         image.value = blog.media.url;
//         altImage.value = blog.media.alt;
//         title.value = blog.title;
//         body.value = blog.body;

//     } catch (error) {
//         console.error('Error fetching or populating blog post data:', error);
//         alert('Failed to fetch or populate blog post data. Please try again later.');
//     }
// }