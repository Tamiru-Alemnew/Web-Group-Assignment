document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    document.getElementById("loginErrorMessage").textContent = errorMessage;
  } else {
    // Assuming your server returns a token upon successful login
    const { token, role } = await response.json();
    
    // Store the token in localStorage or a secure cookie
    localStorage.setItem("token", token);

    // Redirect based on the user's role
    if (role === "parent") {
      window.location.href = "parent.html";
    } else if (role === "children") {
      window.location.href = "list-of-expenses.html";
    }
  }
});
