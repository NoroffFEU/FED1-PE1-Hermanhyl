// import {fetchAPI} from "./fetch.mjs";

const idParameter = window.location.search;
const searchParameter = new URLSearchParams(idParameter);
const postId = searchParameter.get('id');
console.log('this is the id of post', postId);

if(postId) {
    blogPostsFetch(postId)

function blogPostsFetch(postId)  {
    fetch(`https://v2.api.noroff.dev/blog/posts/bilbobolla/${postId}`, {
        method: 'GET',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }) 
    .then(response => {
        if (!response.ok) {
            throw new console.error('Failed to fetch posts');
        }
        return response.json();
    })
    .then(data => {
            const posts = data.data;

            let postContainer = document.getElementById('postsContainer');

            let post = document.createElement('div');
                post.classList.add = 'post';

            let img = document.createElement('img');
                img.src = data.data.media.url;

            let title = document.createElement('h2');
                title.textContent = data.data.title;

            let blogText = document.createElement('p');
            blogText.textContent = data.data.body;

            let published = document.createElement('p');
            published.textContent = data.data.created

            let author = document.createElement('p');
            author.textContent = data.data.author

            post.append(img, title, blogText, published, author);
            postContainer.appendChild(post)



                // HTML for each post
                // const postsHTML = posts(data => `
                //     <div class="post">
                //         <img src="${data.media.url}" alt="${data.media.alt}">
                //         <h2>${data.title}</h2>
                //         <p>${data.body}</p>
                //         <p>Published on: ${data.updated}</p>
                //         <p>Author: ${data.author.name}</p>
                //     </div>
                // `).join('');

            // Insert the generated HTML into the webpage
            // document.getElementById('postsContainer').innerHTML = postsHTML;

    })
} 

}

// fetch(`https://v2.api.noroff.dev/blog/posts/bilbobolla/${postId}`)

//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Failed to fetch posts');
//         }
//         return response.json();
//     })
//     .then(data => {
//         if (data && Array.isArray(data.data) && data.data.length > 0) {
//             const posts = data.data;

//             // HTML for each post
//             const postsHTML = posts.map(post => `
//                 <div class="post">
//                     <img src="${post.media.url}" alt="${post.media.alt}">
//                     <h2>${post.title}</h2>
//                     <p>${post.body}</p>
//                     <p>Published on: ${post.updated}</p>
//                     <p>Author: ${post.author.name}</p>
//                 </div>
//             `).join('');

//             // Insert the generated HTML into the webpage
//             document.getElementById('postsContainer').innerHTML = postsHTML;
//         } else {
//             throw new Error('No posts found in the response');
//         }
//     })
//     .catch(error => {
//         console.error('Error fetching posts:', error);
//     })
//     .catch(error => {
//         console.error('Unhandled error:', error);
//     });


// async function main() {
// const responseData = await fetchAPI(postId)

// }

// main();