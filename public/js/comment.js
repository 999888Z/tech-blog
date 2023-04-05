const commentFunction = async() => {
const textArea = document.getElementById("comment-text")
const id = window.location.toString().split('/')[ window.location.toString().split('/').length - 1];
const addComment = await fetch ("/api/blog-data/add-comment", {
    method: "POST", 
    body: JSON.stringify({textArea, id}),
        headers: { 'Content-Type': 'application/json' },
})
if (addComment.ok){
    document.location.reload()
} else {
    console.log("Add comment failed")
}
}

document.getElementById("comment-btn").addEventListener("submit", commentFunction)