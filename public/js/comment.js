const comment = async() => {
const textArea = document.getElementById("comment-text").value
const id = window.location.toString().split('/')[ window.location.toString().split('/').length - 1];

const addComment = await fetch ("/api/blog-data/add-comment", {
    method: "POST", 
    body: JSON.stringify({comment: textArea, post_id: id}),
        headers: { 'Content-Type': 'application/json' },
})
if (addComment.ok){
    console.log(addComment)
    document.location.reload()
} else {
    console.log("Add comment failed")
}
}

document.getElementById("comment-btn").addEventListener("click", comment)