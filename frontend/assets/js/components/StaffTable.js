
import { $ } from "../utils/dom.js";
import { editStaff, deleteStaffAction } from "../controllers/staffController.js";

// Renders the list of students into an HTML table
export function renderStaffTable(staffs) {
  // Get references to the table body where rows will be inserted and the 'no students' message
  const body = $("StaffTableBody");
  const empty = $("noStaffs");

  // Clear any existing rows from the table body before rendering new data
  body.innerHTML = "";

  // Check if the student array is empty
 if (!staffs || staffs.length === 0) {
    empty.classList.remove("hidden");
    return;
  }
   empty.classList.add("hidden");

  staffs.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-3 py-2">${s.id ?? ""}</td>
      <td class="px-3 py-2">${s.name ?? ""}</td>
      <td class="px-3 py-2">${s.role ?? ""}</td>
      <td class="px-3 py-2">${s.contact ?? ""}</td>
      <td class="px-3 py-2 border">
        <button class="bg-yellow-400 hover:bg-yellow-500 text-black py-1 px-3 rounded" data-edit="${s.id}">Edit</button>
        <button class="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded" data-del="${s.id}">Delete</button>
      </td>
    `;

      body.appendChild(tr);
  });

  body.querySelectorAll("[data-edit]").forEach(btn => {
    btn.addEventListener("click", () => editStaff(Number(btn.dataset.edit)));
  });

  body.querySelectorAll("[data-del]").forEach(btn => {
    btn.addEventListener("click", () => deleteStaffAction(Number(btn.dataset.del)));
  });
}
