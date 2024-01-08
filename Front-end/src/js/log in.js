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
  const errorMessageResponse = await response.text();
  const errorMessage = JSON.parse(errorMessageResponse);
  document.getElementById("loginErrorMessage").textContent = errorMessage.message;
  } else {
    const { accesToken, role } = await response.json();
    document.cookie = `auth=${accesToken}`;
    if (role === "parent") {
      window.location.href = "parent.html";
    } else if (role === "children") {
      window.location.href = "list-of-expenses.html";
    }
  }
});
