import {fetchAPI} from "./fetch.mjs";

// Function to fetch a specific blog post by ID
// async function fetchBlogPostById(blogName, postId) {
//     try {
//         const response = await fetch(`${apiUrl}/blog-posts/${blogName}/${postId}`);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching blog post:', error);
//         return null;
//     }
// }

fetch('https://v2.api.noroff.dev/blog/posts/bilbobolla')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        return response.json();
    })
    .then(data => {
        if (data && Array.isArray(data.data) && data.data.length > 0) {
            const posts = data.data;

            // HTML for each post
            const postsHTML = posts.map(post => `
                <div class="post">
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                    <p>Published on: ${post.updated}</p>
                    <img src="${post.media.url}" alt="${post.media.alt}">
                    <p>Author: ${post.author.name}</p>
                </div>
            `).join('');

            // Insert the generated HTML into the webpage
            document.getElementById('postsContainer').innerHTML = postsHTML;
        } else {
            throw new Error('No posts found in the response');
        }
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
    })
    .catch(error => {
        console.error('Unhandled error:', error);
    });


async function main() {
const responseData = await fetchAPI()

}

main();