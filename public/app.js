document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();
});

async function fetchPosts() {
    try {
        const response = await fetch('https://moodsapp-backend.onrender.com/posts'); // Correct endpoint for fetching posts
        const posts = await response.json();
        const postContainer = document.getElementById('post-container');
        postContainer.innerHTML = ''; // Clear existing posts

        posts.forEach(post => {
            const postBox = document.createElement('div');
            postBox.className = 'post-box';
            postBox.innerHTML = `
            <div class="container sm:boder-4 sm:border-rose-500 bg-stone-100 w-[100%] py-2 px-4 rounded-xl ">
                <h2 class="person-name sm:text-2xl text-1xl text-black">${post.name}</h2>
                <div class="person-post sm:text-[1.5vw] text-zinc-800">${post.content}</div>
            </div>
            `;
            postContainer.appendChild(postBox);
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

async function submitPost() {
    var box = document.getElementById('add-post-box');
    box.classList.add('hidden') // remove the box
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
        const response = await fetch('https://moodsapp-backend.onrender.com/posts', { // Correct endpoint for creating posts
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

// Add an event listener to the post button to call submitPost()
document.getElementById('post-form').addEventListener('submit', (event) => {
    event.preventDefault();
    submitPost();
});
