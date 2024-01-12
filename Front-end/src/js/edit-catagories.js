function addCategory() {
  var input = document.getElementById("newCategoryInput");
  var categoryName = input.value.trim();

  if (categoryName !== "") {
    fetch("http://localhost:3000/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: categoryName }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Add the new category to the list
        var list = document.getElementById("categoryList");
        var newItem = document.createElement("li");
        newItem.innerHTML = `
                <span class="name">${data.name}</span>
                <span class="actions">
                    <button onclick="editCategory(this, ${data.id})">Edit</button>
                    <button onclick="deleteCategory(this, ${data.id})">Delete</button>
                </span>
            `;
        list.appendChild(newItem);
        input.value = "";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function editCategory(button, id) {
  var newName = prompt("Enter the new name for the category");
  if (newName !== null) {
    fetch(`http://localhost:3000/category/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    })
      .then((response) => {
        if (response.ok) {
          return response.text().then((text) => {
            return text ? JSON.parse(text) : {};
          });
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((data) => {

        var nameSpan = button.parentElement.previousElementSibling;
        nameSpan.textContent =newName;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

function deleteCategory(button, id) {
  fetch(`http://localhost:3000/category/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      // Remove the category from the list
      var listItem = button.parentElement.parentElement;
      listItem.remove();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
