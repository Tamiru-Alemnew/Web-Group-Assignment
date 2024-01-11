let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expnese-table-body');
const totalAmountCell = document.getElementById('total-amount');

addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <=0 ) {
        alert('Please enter a valid amoun')
        return;
    }
    if(date === '') {
        alert('Please select a date')
        return;
    }
    expenses.push({category, amount, date});

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        expenses.splice(expenses.indexOf(expense), 1);

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        expensesTableBody.removeChild(newRow);
    });

    const expense = expenses[expenses.length - 1];
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);

});

for (const expense of expenses) {
    totalAmount += expense.amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = expensesTableBody.inserRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        expenses.splice(expenses.indexOf(expense), 1);

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        expensesTableBody.removeChild(newRow);
    });
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
}
fetch('http://localhost:3000/expense')
  .then(response => response.json())
  .then(expenses => {
    console.log(expenses);
  })
  .catch(error => {
    console.error('Error:', error);
  });

const form = document.getElementById('category-select');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newItem = {
    category: document.getElementById('category-select').value,
  };
  try {
    const response = await fetch('http://localhost:3000/expense', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    });
    if (response.ok) {
      console.log('Expense added successfully');
    } else {
      console.error('Failed to add expense:' );
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

const expenseIdToUpdate = 'category-select';
const updatedItem = {
  category: document.getElementById('category-select').value,
};

try {
  const response = await fetch(`http://localhost:3000/expense/category-select`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedItem),
  });
  if (response.ok) {
    console.log('Expense updated successfully');
  } else {
    console.error('Failed to update expense:', );
  }
} catch (error) {
  console.error('Error:', error);
}

const expenseIdToDelete = 'category-select';

try {
  const response = await fetch(`http://localhost:3000/expense/category-select`, {
    method: 'DELETE',
  });
  if (response.ok) {
    console.log('Expense deleted successfully');
  } else {
    console.error('Failed to delete expense:', );
  }
} catch (error) {
  console.error('Error:', error);
}