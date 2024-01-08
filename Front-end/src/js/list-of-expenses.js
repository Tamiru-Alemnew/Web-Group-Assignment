
document.addEventListener("DOMContentLoaded", async function () {

  const categories = await getAllCategories();

  const categorySelect = document.getElementById("category-select");
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.name;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
});


async function getAllCategories() {
  const response = await fetch("http://localhost:3000/category");
  const categories = await response.json();
  return categories;
}

// Fetch the user
async function getUser() {
  const response = await fetch('http://localhost:3000/auth/user');
  console.log(response)
  const user = await response.json();
  console.log(user)
  return user;
}

document.getElementById('add-btn').addEventListener('click', async function() {
  const category = document.getElementById('category-select').value;
  const amount = document.getElementById('amount-input').value;
  const date = document.getElementById('date-input').value;
  const user = await getUser();

  const expense = { category, amount, date, userId: user.id };
  const success = await createExpense(expense);

  if (success) {
    document.getElementById('amount-input').value = '';
    document.getElementById('date-input').value = '';
    await populateTable();
  }
});

async function createExpense(expense) {
  const response = await fetch('http://localhost:3000/expense', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expense),
  });
  return response.ok;
}

// Fetch all expenses
async function getAllExpenses() {
  const response = await fetch('http://localhost:3000/expense');
  const expenses = await response.json();
  return expenses;
}

async function populateTable() {
  const user = await getUser();
  const newexpenses = await getAllExpenses();
  console.log(user)
  const expenses = newexpenses.filter((expense) => expense.userId === user.id);
  const tableBody = document.getElementById("expnese-table-body");

  let totalAmount = 0;
  tableBody.innerHTML = expenses
    .map((expense) => {
      totalAmount += parseFloat(expense.amount);
      return `
      <tr>
        <td>${expense.category}</td>
        <td>${expense.amount}</td>
        <td>${new Date(expense.date).toLocaleDateString()}</td>
        <td><button data-id="${expense.id}">Delete</button></td>
      </tr>
    `;
    })
    .join("");

  document.getElementById("total-amount").textContent = totalAmount.toFixed(2);

  // Add event listeners to the "Delete" buttons
  tableBody.querySelectorAll("button[data-id]").forEach((button) => {
    button.addEventListener("click", async function () {
      const id = this.dataset.id;
      const success = await deleteExpense(id);
      if (success) {
        await populateTable();
      }
    });
  });
}

// Delete an expense
async function deleteExpense(id) {
  const response = await fetch(`http://localhost:3000/expense/${id}`, {
    method: "DELETE",
  });
  return response.ok;
}

document.addEventListener("DOMContentLoaded", populateTable);
document.addEventListener("DOMContentLoaded", async () => {
 const auth = document.cookie.split("=")[1];
 console.log(auth , "authhhhhhhhhhhhh")
 if (!auth) {
   window.location.href = "log in page.html";
 }
})