document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  if (email === "" || password === "") {
    alert("Please fill in all fields");
    return;
  }

  console.log("Email:", email);
  console.log("Password:", password);

  alert("Login Successful!");
});
