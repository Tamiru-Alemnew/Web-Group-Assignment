document
  .getElementById("addCat")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const des = document.getElementById("des").value;
    const image = document.getElementById("image").value;
    const amount = document.getElementById("amount").value;

    const response = await fetch("http://localhost:3000/auth/existingCategories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, des, image ,amount }),
    });
