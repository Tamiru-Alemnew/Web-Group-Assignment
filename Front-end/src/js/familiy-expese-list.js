async function getUser() {
  const response = await fetch("http://localhost:3000/auth/user");
  const user = await response.json();
  return user;
}

// Fetch all expenses
async function getAllExpenses() {
  const response = await fetch("http://localhost:3000/expense");
  const expenses = await response.json();
  return expenses;
}

async function populateTable() {
  const user = await getUser();
  const newexpenses = await getAllExpenses();
  console.log(user);
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

window.addEventListener("DOMContentLoaded", populateTable);
window.addEventListener("DOMContentLoaded", async () => {
 const auth = window.coockie.split("=")[1];
 if (!auth) {
   window.location.href = "log in page.html";
 }
})