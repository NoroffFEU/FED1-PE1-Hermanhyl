import { isLoggedIn } from '../js-files/comon.mjs';

const idParameter = window.location.search;
const searchParameter = new URLSearchParams(idParameter);
export const postId = searchParameter.get('id');

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
                img.alt = data.data.media.alt;

            let title = document.createElement('h1');
                title.textContent = data.data.title;

            let blogText = document.createElement('p');
            blogText.textContent = data.data.body;

            let published = document.createElement('p');
            published.textContent = data.data.created

            let author = document.createElement('p');
            author.textContent = data.data.author.name

            let edit = document.createElement('button');
            edit.textContent = 'Edit';
            edit.addEventListener('click', () => {
            window.location.href = '../post/edit.html' + '?' + postId
            });
            if (!isLoggedIn()) {
                edit.style.display ='none';
            }

            post.append(img, title, blogText, published, author, edit);
            postContainer.appendChild(post)

    }) 
    .catch(error => {
        console.error('Error fetching posts:', error);
    });
} 
}