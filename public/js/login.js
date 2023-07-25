

  //UI LOGIN
  const loginFormHandler = (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#loginUsername').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#loginPassword').value.trim();

  if (username && email && password) {
    // Send a POST request to the API endpoint
    fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username,email, password }),
      headers: { 'Content-Type': 'application/json' },
    }).then((loginData)=>loginData.json()).then((loginData)=>{
      if (loginData) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }).catch((err)=>{
      console.log(err)
    })

    
  }
};


//UI SIGN UP
const signupFormHandler = (event) => {
  event.preventDefault();

  const username = document.querySelector('#signupUsername').value.trim();
  const email = document.querySelector('#signupemail').value.trim();
  const password = document.querySelector('#signupPassword').value.trim();

  if (username && email && password) {
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    }).then((signUpData)=>{
        console.log('login resposne = ',signUpData)

        if (signUpData) {
          console.log('sign up success!')
          document.location.replace('/dashboard')
        } else {
          alert(response.statusText);
        }
    }).catch((err)=>{
      console.log(err)
    })

  }
};



document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
