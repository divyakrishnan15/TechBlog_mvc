const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#loginUsername').value.trim();
  const password = document.querySelector('#loginPassword').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('http://localhost:3001/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};



const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#signupUsername').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#signupPassword').value.trim();

  if (name && email && password) {
    const response = await fetch('http://localhost:3001/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};



document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
