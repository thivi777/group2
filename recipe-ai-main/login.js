document.getElementById('loginForm').addEventListener('submit', function(e){
    e.preventDefault(); // prevent form submission
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Demo login check
    if(username === 'admin' && password === '12345'){
      alert('Login successful!');
      window.location.href = 'index.html'; // redirect to homepage
    } else {
      alert('Invalid username or password');
    }
  
    // Clear form fields
    document.getElementById('loginForm').reset();
  });
  
  