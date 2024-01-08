document
  .getElementById("signupForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const fullname = document.getElementById("Fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullname, email, password, role }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      const errorMessageResponse = JSON.parse(errorMessage);
      document.getElementById("errorMessage").textContent = errorMessageResponse.message;
    } else {
      
      const logData= await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const { accesToken } = await logData.json();
      document.cookie = `auth=${accesToken}`;
      if(role =="parent"){
        window.location.href = "parent.html";
      }else if(role =="children"){
        window.location.href = "list-of-expenses.html";
      }
    }
  });

