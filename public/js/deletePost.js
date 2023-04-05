const deletePost = async () => {
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const erase = await fetch(`/api/blog-data/delete/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (erase.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to update.");
  }
};

document.getElementById("delete-btn").addEventListener("click", deletePost)