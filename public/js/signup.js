const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#name-signup').value.trim();
   
    const password = document.querySelector('#password-signup').value.trim();
  //Posts user name and password data to the database
    if (name && password) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert("Please enter valid value.");
      }
    }
  };

  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);