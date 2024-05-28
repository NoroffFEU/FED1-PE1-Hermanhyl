async function deleteBlogPostById(id) {
    const url = `https://v2.api.noroff.dev/blog-posts/${id}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete blog post');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting blog post:', error);
        return null;
    }
}