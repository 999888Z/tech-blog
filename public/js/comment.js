const comment = async () => {
  const textArea = document.getElementById("comment-text").value;
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const addComment = await fetch("/api/blog-data/add-comment", {
    method: "POST",
    body: JSON.stringify({ comment: textArea, post_id: id }),
    headers: { "Content-Type": "application/json" },

  });
  console.log(addComment)
  if (response.ok) {
    document.location.reload();
  }
   
  
};

document.getElementById("comment-btn").addEventListener("click", comment);
