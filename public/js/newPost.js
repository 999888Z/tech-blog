const newPostFormHandler = async (event) => {
    event.preventDefault();

    // Collect values from the new post form
    const title = document.querySelector('#post-title').value.trim();
    const body = document.querySelector('#post-content').value.trim();

    if (title && body) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/blog-data/create-new-post', {
            method: 'POST',
            body: JSON.stringify({ title, body }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText);
        }
    }
}

document
    .querySelector('.newPost-form')
    .addEventListener('submit', newPostFormHandler);