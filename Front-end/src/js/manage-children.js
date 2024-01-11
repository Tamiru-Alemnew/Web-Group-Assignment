
let children;
document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("http://localhost:3000/auth/getAllUsers");
  children = await response.json();

  const table = document.getElementById("children-table");

  children?.forEach((child) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = child.email;
    row.appendChild(nameCell);

    const roleCell = document.createElement("td");
    const select = document.createElement("select");

    const role1Option = document.createElement("option");
    role1Option.value = child.role;
    role1Option.textContent = child.role;

    
    select.appendChild(role1Option);

    const role2Option = document.createElement("option");
    if (child.role === "parent"){
        role2Option.value = "children";
        role2Option.textContent = "children";
    }else{
        role2Option.value = "parent";
        role2Option.textContent = "parent";
    }
    select.appendChild(role2Option);
    roleCell.appendChild(select);
    row.appendChild(roleCell);

    table.appendChild(row);

   const button = document.querySelector(".save-changes");
   button.addEventListener("click", async () => {
    console.log(select.value);
    const response = await fetch("http://localhost:3000/auth/updateRole", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: child.id,
        role: select.value,
      }),
    });
    const data = await response.json();
    if (data.success) {
      window.location.reload();
    }
    }
    );
  });
});
