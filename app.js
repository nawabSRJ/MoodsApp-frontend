document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();
});

async function fetchPosts() {
    try {
        const response = await fetch('/posts');
        const posts = await response.json();
        const postContainer = document.getElementById('post-container');
        postContainer.innerHTML = ''; // Clear existing posts

        posts.forEach(post => {
            const postBox = document.createElement('div');
            postBox.className = 'post-box';
            postBox.innerHTML = `
            <fieldset>
                <h2 id="person-name">${post.name}</h2>
                <div id="person-post">${post.content}</div>
            </fieldset>
            `;
            postContainer.appendChild(postBox);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

async function submitPost() {
    const nameEntry = document.getElementById('name-entry').value;
    const postEntry = document.getElementById('post-entry').value;

    if (!nameEntry || !postEntry) {
        alert('Name and content are required');
        return;
    }

    const postData = {
        name: nameEntry,
        content: postEntry
    };

    try {
        const response = await fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });

        if (response.ok) {
            fetchPosts(); // Refresh posts
            document.getElementById('post-form').reset(); // Clear the form
        } else {
            console.error('Failed to create post');
        }
    } catch (error) {
        console.error('Error submitting post:', error);
    }
}
