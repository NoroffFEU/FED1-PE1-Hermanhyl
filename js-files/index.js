// Fetch data from the API endpoint
fetch('https://v2.api.noroff.dev/blog/posts/bilbobolla')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        return response.json();
    })
    .then(data => {
        createBlogCards(data.data);
        console.log(data);
    })
    .catch(error => {
        console.error('Error fetching posts:', error);
    });

function createBlogCards(blogPosts) {
    let gridContainer = document.querySelector('.grid-container');
    if (!gridContainer) {
        console.error('Grid container not found');
        return;
    }

    blogPosts.forEach(data => {
        let gridItem = document.createElement('div');
        gridItem.classList.add('img-container');

        let img = document.createElement('img');
        img.addEventListener('click', () => {
            window.location.href = `post/index.html?id=${data.id}`;
        });
        img.alt = '';
        if (data.media && data.media.url) {
            img.src = data.media.url;
        } else {
            // img.src = '../images/Image_nr1.jpg';
        }

        let title = document.createElement('h2');
        title.textContent = data.title;
        // title.addEventListener('click', () => {
        //     window.location.href = `post/index.html?id=${post.id}`;
        // });

        gridItem.appendChild(img);
        gridItem.appendChild(title);
        gridContainer.appendChild(gridItem);
    });
}
