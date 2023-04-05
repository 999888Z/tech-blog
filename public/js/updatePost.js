const updatePost = async () => {
   
    const id = window.location.toString().split('/')[ window.location.toString().split('/').length - 1];
    const body = document.getElementById('update-body').value.trim();
    const title = document.getElementById('update-title').value.trim();

    if(body && title){
      
    var response = await fetch(`/api/blog-data/update-post/${id}`, {
    
      method: 'PUT',
      body: JSON.stringify({title, body}),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log("also here")
    }
    else if (body && !title){
        var response = await fetch(`/api/blog-data/update-post/${id}`, {
            method: 'PUT',
            body: JSON.stringify({body}),
            headers: { 'Content-Type': 'application/json' },
          });
    }
    else if(title && !body){
        var response = await fetch(`/api/blog-data/update-post/${id}`, {
            method: 'PUT',
            body: JSON.stringify({title}),
            headers: { 'Content-Type': 'application/json' },
          });
    }
    if (response.ok) {

      document.location.replace('/dashboard');
    } else {
      alert('Failed to update.');
    }
  }; 
   
    


document.getElementById('update-btn').addEventListener("click", updatePost);