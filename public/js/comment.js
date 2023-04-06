//Directs comment to a particular post
const comment = async () => {
  const textArea = document.getElementById("comment-text").value;
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  //Posting a new comment to database
  const addComment = await fetch("/api/blog-data/add-comment", {
    method: "POST",
    body: JSON.stringify({ comment: textArea, post_id: id }),
    headers: { "Content-Type": "application/json" },

  });
  
  if (response.ok) {
    document.location.replace(`/comment/${id}`)
  }
   
  
};

document.getElementById("comment-btn").addEventListener("click", comment);
