fetch('https://v2.api.noroff.dev/blog/posts/bilbobolla')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        return response.json();
    })
    .then(data => {
        createBlogCards(data.data);
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
        } 

        let title = document.createElement('h2');
        title.textContent = data.title;
        title.addEventListener('click', () => {
            window.location.href = `post/index.html?id=${data.id}`;
        });

        gridItem.appendChild(img);
        gridItem.appendChild(title);
        gridContainer.appendChild(gridItem);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = 'https://v2.api.noroff.dev/blog/posts/bilbobolla';
    const postContainer = document.querySelector('.post-container');
    const prevButton = document.getElementById('prevBtn');
    const nextButton = document.getElementById('nextBtn');
    let currentIndex = 0;
    let postsData = [];

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            return response.json();
        })
        .then(data => {
            postsData = data.data.slice(0, 3);
            renderPost(currentIndex);
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });

    function renderPost(index) {
        const postData = postsData[index];
        if (postData) {
            postContainer.innerHTML = `
                <img src="${postData.media.url}" alt="${postData.title}" id="postImage">
                <h2 id="postTitle">${postData.title}</h2>
            `;

            document.getElementById('postImage').addEventListener('click', () => {
                window.location.href = `post/index.html?id=${postData.id}`;
            });

            document.getElementById('postTitle').addEventListener('click', () => {
                window.location.href = `post/index.html?id=${postData.id}`;
            });
        }
    }

    nextButton.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % postsData.length;
        renderPost(currentIndex);
    });

    prevButton.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + postsData.length) % postsData.length;
        renderPost(currentIndex);
    });
});


